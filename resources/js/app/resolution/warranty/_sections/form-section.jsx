import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import Select from '@/app/_components/select';
import { router } from '@inertiajs/react';
import { Controller, useForm } from 'react-hook-form';
import { countries } from "@/app/_json/country.json";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Checkbox from '@/app/_components/checkbox';
import Textarea from '@/app/_components/textarea';
import UploadFileSection from '../../_sections/upload-file-section';
import { create_ticket_service } from '@/app/services/tickets-service';
import Radio from '@/app/_components/radio';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_product_registration_by_serial_number_thunk, get_ticket_by_serial_number_thunk } from '@/app/_redux/app-thunk';
import store from '@/app/store/store';

export default function FormSection() {
    const { product_registration, products, ticket } = useSelector((store) => store.app);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        setValue, // We will use this to loop through our redux state
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            phone2: "",
            item_number: "",
            unit: "",
            brand: "",
            class: "",
            serial_number: "",
            purchase_date: "",
            zip_code: "",
            country: "",
            state: "",
            city: "",
            address: "",
            detailed_explanation_issue: null,
            has_contacted_store: null,
            store_refusal_reason: null,
            has_address_2: false,
            address2: null,
            remarks: "Calling From:\nStore:\nPurchase Date:\nIssue:\nRemarks:",
            files: {
                modelSerial: [],
                bill_of_sale: [],
                issueEvidence: []
            }
        }
    });

    const watchValues = watch()
    const productFilter = products.slice(2);


    const is_under_45_days = watchValues.purchase_date && moment(watchValues.purchase_date).isAfter(moment().subtract(45, 'days'));
    const is_over_45_days = watchValues.purchase_date && moment(watchValues.purchase_date).isBefore(moment().subtract(45, 'days'));

    useEffect(() => {
        const searchTerm = watchValues.item_number?.toLowerCase() || "";
        const searchProductsList = productFilter.find((product) =>
            product.some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm)
            )
        );
        if (searchTerm) {
            setValue('unit', searchProductsList[2] ?? '');
            setValue('brand', searchProductsList[0] ?? '');
            setValue('class', searchProductsList[3] ?? '');
            setValue('address2', '');
        }

    }, [watchValues.item_number])

    useEffect(() => {
        if (ticket?.id) {
            const searching = ticket?.model === '' ? null : ticket?.model?.toLowerCase();

            const searchProductsList = productFilter.find((product) =>
                product.some((value) => typeof value === 'string' && value?.toLowerCase().includes(searching))
            );
            setValue('unit', searchProductsList[2] ?? '');
            setValue('brand', searchProductsList[0] ?? '');
            setValue('class', searchProductsList[3] ?? '');
            if (ticket && typeof ticket === 'object') {
                Object.keys(ticket).forEach((key) => {
                    // Map the 'model' key from Redux to the 'item_number' form input
                    if (key === 'model') {
                        setValue('item_number', ticket[key]);
                    } if (key === 'serial') {
                        setValue('serial_number', ticket[key]);
                    } if (key === 'address1') {
                        setValue('address', ticket[key]);
                    } if (key === 'zipcode') {
                        setValue('zip_code', ticket[key]);
                    } else {
                        // Set all other fields normally
                        setValue(key, ticket[key]);
                    }
                });
            }
        }

    }, [ticket, setValue]);

    const onSubmit = async (data) => {

        const formData = new FormData();


        Object.keys(data).forEach(key => {
            if (key === 'files') {
                // Append files using the exact category ID expected by the backend
                Object.keys(data.files).forEach(category => {
                    data.files[category].forEach(file => {
                        // Use category[] so PHP receives an array of files per category
                        formData.append(`${category}[]`, file);
                    });
                });
            } else {
                // Handle standard text fields
                if (key != 'common_issues') {
                    formData.append(key, data[key] === null ? '' : data[key]);
                }
                if (key == 'store_refusal_reason') {
                    formData.append('store_refusal_reason', is_over_45_days ? '' : data[key]);
                }

            }
        });

        try {
            formData.append('call_type', 'CF-Warranty Claim');
            await toast.promise(
                create_ticket_service(formData),
                {
                    pending: 'Submitting your ticket...',
                    success: 'Your form has been successfully submitted. You will receive an email confirmation shortly. 🛠️',
                    error: 'Failed to submit the form. Please try again. ❌'
                }
            );
            reset();

        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit the form. Please try again.");
        } finally {
        }
    };

    useEffect(() => {
        register("files", {
            validate: (value) => {
                const requiredCategories = ['readable_serial_section', 'bill_of_sale', 'defect_issue'];

                // Check if any required category is empty or missing
                const missingCategories = requiredCategories.filter(
                    (id) => !value?.[id] || value[id].length === 0
                );

                if (missingCategories.length > 0) {
                    return "All attachment sections are mandatory. Please upload the missing files.";
                }
                return true;
            }
        });
    }, [register]);

    const states = countries?.find(res => res.value == watchValues.country)
    const call_type = window.location.pathname.split('/')[2]

    // TRUE if the item was bought recently (0 to 45 days ago)
    const serialRegex = /^A\d{16}$/;

    // 2. Test the watched value against it
    const is_correct_pattern = serialRegex.test(watchValues.serial_number);


    async function search_serial_number(e) {
        if (serialRegex.test(e.target.value)) {
            await toast.promise(
                store.dispatch(get_product_registration_by_serial_number_thunk(e.target.value)),
                {
                    pending: 'Searching...',
                    error: 'Failed to submit the form. Please try again. ❌'
                }
            );
        }
    }

    const formatUSPhone = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    console.log('ticketticketbadodo', ticket)
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white w-full flex flex-col gap-3 min-h-[70vh]"
            >
                {
                    !ticket?.ticket?.id && is_under_45_days && (
                        <div className='border border-green-500 rounded-md p-2 text-green-500 shadow-sm mb-4 bg-green-100'>
                            The purchase was within the last 45 days. For faster resolution, please return it to the retailer for refund or replacement.
                        </div>
                    )
                }

                {
                    ticket?.ticket?.id && (
                        <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4 bg-red-100'>
                            <div>
                                A previous claim has been identified for this serial number. If you believe this information is incorrect or would like us to review it further, please check here to dispute this finding

                            </div>
                            <div className='flex items-center justify-end'>
                                <Button
                                    onClick={() => window.open(`/resolution/search/${ticket?.ticket?.serial_number}`, '_blank')}
                                    variant='primary'
                                >
                                    CHECK THE TICKET STATUS
                                </Button>
                            </div>
                        </div>
                    )
                }

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    <Input
                        id="purchase_date"
                        type="date"
                        label="Purchase Date"
                        disabled={ticket?.ticket?.id}
                        max={new Date().toISOString().split("T")[0]} // Restricts selection to today or earlier
                        error={errors.purchase_date?.message}
                        required={true}
                        {...register("purchase_date", { required: "Purchase Date is required" })}
                    />

                    <Input
                        id="serial_number"
                        label="Serial Number (e.g. A1234567890123456)"
                        error={errors.serial_number?.message}
                        disabled={window.location.pathname.split('/')[3] != 'blank'}
                        maxLength={17}
                        required={true}
                        {...register("serial_number", {
                            required: "Serial number is required",
                            pattern: {
                                value: /^A\d{16}$/,
                                message: "Invalid format. Serial number must start with 'A' followed by 15 digits."
                            },
                        })}
                        onChange={search_serial_number}
                    />
                </div>

                <div className=' flex flex-col gap-3'>
                    {
                        (!ticket?.ticket?.id && watchValues.purchase_date && call_type == 'warranty' && is_under_45_days && is_correct_pattern) && <>
                            Have you tried contacting the store for the return policy?
                            <div className='flex gap-8 my-3'>
                                <Radio
                                    name="has_contacted_store"
                                    label="Yes"
                                    checked={watchValues.has_contacted_store === 'Yes'}
                                    onChange={() => setValue("has_contacted_store", 'Yes')}
                                />

                                <Radio
                                    name="has_contacted_store"
                                    label="No"
                                    checked={watchValues.has_contacted_store === 'No'}
                                    onChange={() => setValue("has_contacted_store", 'No')}
                                />
                            </div>

                            {watchValues.has_contacted_store == 'Yes' && (
                                <Textarea
                                    name="store_refusal_reason"
                                    label="State the reason why the store did not take the unit back"
                                    {...register("store_refusal_reason", { required: "Reason is required" })}
                                    error={errors.store_refusal_reason?.message}
                                />
                            )}

                        </>
                    }
                </div>
                {
                    (watchValues.has_contacted_store == 'No' && is_under_45_days) && <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4'>
                        We highly suggest returning it to the retailer for refund or replacement.
                    </div>
                }

                {
                    (!ticket?.ticket?.id && watchValues.has_contacted_store == 'Yes' || is_over_45_days) && <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <Input
                                id="fname"
                                label="First Name"
                                error={errors.fname?.message}
                                required={true}
                                {...register("fname", { required: "First name is required" })}
                            />
                            <Input
                                id="lname"
                                label="Last Name"
                                error={errors.lname?.message}
                                required={true}
                                {...register("lname", { required: "Last name is required" })}
                            />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            error={errors.email?.message}
                            required={true}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <Input
                                id="phone"
                                type="tel"
                                label="Phone Number"
                                error={errors.phone?.message}
                                required={true}
                                maxLength={14} // Restricts input to the exact length of (XXX) XXX-XXXX
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                                        message: "Must be a valid US phone number: (XXX) XXX-XXXX",
                                    },
                                    onChange: (e) => {
                                        e.target.value = formatUSPhone(e.target.value);
                                    },
                                })}
                            />

                            <Input
                                id="phone2"
                                type="tel"
                                label="Secondary Phone Number"
                                error={errors.phone2?.message}
                                maxLength={14}
                                {...register("phone2", {
                                    pattern: {
                                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                                        message: "Must be a valid US phone number: (XXX) XXX-XXXX",
                                    },
                                    onChange: (e) => {
                                        e.target.value = formatUSPhone(e.target.value);
                                    },
                                })}
                            />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                            <Select
                                label="Model Number"
                                name="item_number"
                                options={
                                    productFilter?.map((res) => ({
                                        ...res,
                                        label: res[1],
                                        value: res[1],
                                    })) || []
                                }
                                value={watchValues.item_number}
                                onChange={(val) =>
                                    setValue("item_number", val)
                                }
                                required={true}
                                // {...register("item_number", { required: "Item number is required" })}
                                error={errors.item_number?.message}
                            />
                            <Input
                                id="unit"
                                label="Item Unit"
                                error={errors.unit?.message}
                                disabled
                                {...register("unit")}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <Input
                                id="brand"
                                label="Brand"
                                disabled
                                error={errors.brand?.message}
                                {...register("brand")}
                            />
                            <Input
                                id="class"
                                disabled
                                label="Item Class"
                                error={errors.class?.message}
                                {...register("class")}
                            />
                        </div>


                        {/* Address Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            <Input
                                id="zip_code"
                                label="Zip Code / Postal Code"
                                error={errors.zip_code?.message}
                                required={true}
                                {...register("zip_code", { required: "Zip code is required" })}
                            />
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Country is required" }}
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <Select
                                        label="Country"
                                        required
                                        name="country"
                                        ref={ref}
                                        value={value}
                                        onChange={onChange} // Pass the Controller's onChange directly to your component
                                        error={error?.message}
                                        options={
                                            countries?.map((res) => ({
                                                ...res,
                                                label: res.name,
                                                value: res.value,
                                            })) || []
                                        }
                                    />
                                )}
                            />

                            <Controller
                                name="state"
                                control={control}
                                rules={{ required: "State is required" }}
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <Select
                                        label="State"
                                        required
                                        name="state"
                                        ref={ref}
                                        value={value}
                                        onChange={onChange} // Pass the Controller's onChange directly to your component
                                        error={error?.message}
                                        options={
                                            states?.regions?.map((res) => ({
                                                ...res,
                                                label: res.name,
                                                value: res.value,
                                            })) || []
                                        }
                                    />
                                )}
                            />

                            <Input
                                id="city"
                                label="City"
                                error={errors.city?.message}
                                required={true}
                                {...register("city", { required: "City is required" })}
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                id="address"
                                label="Address"
                                error={errors.address?.message}
                                required={true}
                                {...register("address", { required: "Street address is required" })}
                            />
                        </div>
                        <Checkbox
                            id="has_address_2"
                            className='my-3'
                            checked={watchValues.has_address_2}
                            label="Is your physical address the same as your mailing address?"
                            onChange={(val) =>
                                setValue("has_address_2", val.target.checked)
                            }
                        />
                        {
                            !watchValues.has_address_2 && <div className="w-full">
                                <Input
                                    id="address2"
                                    name="address2"
                                    label="Mailing Address 2"
                                    error={errors.address?.message}
                                    required={true}
                                    {...register("address2", { required: "Full address is required" })}
                                />
                            </div>
                        }
                        <div className="w-full">
                            <Textarea
                                name="detailed_explanation_issue"
                                label="Detailed explanation of the issue."
                                {...register("detailed_explanation_issue", { required: "Issue is required" })}
                                error={errors.detailed_explanation_issue?.message}
                            />
                        </div>

                        <UploadFileSection
                            files={watchValues.files || {}}
                            setFiles={(newFiles) => setValue('files', newFiles, { shouldValidate: true })}
                            error={errors.files} // <-- Pass the error object down
                        />
                        <div className="flex justify-center pt-2 md:pt-4">
                            <Button
                                loading={isSubmitting}
                                className="w-full sm:w-auto px-12"
                                variant="primary"
                                type="submit"
                            >
                                SUBMIT
                            </Button>
                        </div>
                    </>
                }
            </form>
        </>
    );
}