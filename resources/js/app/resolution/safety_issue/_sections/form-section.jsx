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
import { toast } from 'react-toastify';
import store from '@/app/store/store';
import { get_product_registration_by_serial_number_thunk } from '@/app/_redux/app-thunk';

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
            zip_code_2: "",
            country_2: "",
            state_2: "",
            city_2: "",
            address_2: "",
            detailed_explanation_issue: null,
            has_contacted_store: null,
            store_refusal_reason: null,
            has_address_2: false,
            address2: null,
            remarks: "Calling From:\nStore:\nPurchase Date:\nIssue:\nRemarks:",
            agree1: false,
            agree2: false,
            files: {
                modelSerial: [],
                bill_of_sale: [],
                issueEvidence: []
            }
        }
    });

    const watchValues = watch()
    const productFilter = products.slice(2);

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
            if (searchProductsList) {
                setValue('unit', searchProductsList[2] ?? '');
                setValue('brand', searchProductsList[0] ?? '');
                setValue('class', searchProductsList[3] ?? '');
            }

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

            }
        });


        try {
            formData.append('call_type', 'Safety Issue');
            await toast.promise(
                create_ticket_service(formData),
                {
                    pending: 'Submitting your ticket...',
                    success: {
                        render: 'Your form has been successfully submitted. You will receive an email confirmation shortly. 🛠️',
                        autoClose: false, // Prevents auto-closing on success
                    },
                    error: {
                        render: 'Failed to submit the form. Please try again. ❌',
                        autoClose: false, // Prevents auto-closing on error
                    }
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
                // 'bill_of_sale' has been removed from the required list
                const requiredCategories = ['readable_serial_section', 'defect_issue'];

                // Check if any required category is empty or missing
                const missingCategories = requiredCategories.filter(
                    (id) => !value?.[id] || value[id].length === 0
                );

                if (missingCategories.length > 0) {
                    return "All required attachment sections are mandatory. Please upload the missing files.";
                }
                return true;
            }
        });
    }, [register]);

    const states = countries?.find(res => res.value == watchValues.country)

    const serialRegex = /^A\d{16}$/;
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
    console.log('ticket', ticket)
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white w-full flex flex-col gap-3 min-h-[70vh]"
            >

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
                    <Input
                        id="purchase_date"
                        type="date"
                        label="Purchase Date"
                        disabled={ticket?.ticket?.id}
                        max={new Date().toISOString().split("T")[0]} // Restricts selection to today or earlier
                        error={errors.purchase_date?.message}
                        required={true}
                        {...register("purchase_date", { required: "Purchase Date is required" })}
                        onKeyDown={(e) => {
                            if (e.key !== "Tab") {
                                e.preventDefault();
                            }
                        }}
                        onClick={(e) => {
                            if (e.currentTarget.showPicker) {
                                e.currentTarget.showPicker();
                            }
                        }}
                    />
                </div>
                {
                    !ticket?.ticket?.id && <>
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

                        <div className="w-full">
                            <Input
                                id="address"
                                label="Address"
                                error={errors.address?.message}
                                required={true}
                                {...register("address", { required: "Street address is required" })}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                            <Input
                                id="zip_code"
                                label="Zip Code / Postal Code"
                                error={errors.zip_code?.message}
                                required={true}
                                {...register("zip_code", { required: "Zip code is required" })}
                            />
                        </div>

                        <Checkbox
                            id="has_address_2"
                            className='my-3'
                            checked={watchValues.has_address_2}
                            label="My physical address is the same as my mailing address."
                            onChange={(val) =>
                                setValue("has_address_2", val.target.checked)
                            }
                        />
                        {
                            !watchValues.has_address_2 && <>
                                <div className="w-full">
                                    <Input
                                        id="address_2"
                                        label="Address_2"
                                        error={errors.address_2?.message}
                                        required={true}
                                        {...register("address_2", { required: "Street address is required" })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                    <Controller
                                        name="country_2"
                                        control={control}
                                        rules={{ required: "Country is required" }}
                                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                            <Select
                                                label="Country"
                                                required
                                                name="country_2"
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
                                        name="state_2"
                                        control={control}
                                        rules={{ required: "State is required" }}
                                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                            <Select
                                                label="State"
                                                required
                                                name="state_2"
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
                                        id="city_2"
                                        label="City"
                                        error={errors.city?.message}
                                        required={true}
                                        {...register("city_2", { required: "City is required" })}
                                    />
                                    <Input
                                        id="zip_code_2"
                                        label="Zip Code / Postal Code"
                                        error={errors.zip_code?.message}
                                        required={true}
                                        {...register("zip_code_2", { required: "Zip code is required" })}
                                    />
                                </div>
                            </>
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
                        <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4 bg-red-100'>
                            Check your Spam/Junk folder for confirmation emails and future claim-related communications.
                        </div>

                        <Checkbox
                            name="agree1"
                            label="Add a required checkbox for customers to acknowledge the accuracy of the information provided."
                            checked={watchValues.agree1}
                            onChange={(e) => setValue("agree1", e.target.checked)}
                        />
                        <Checkbox
                            name="agree2"
                            label="By submitting this warranty claim, I certify that all information and documentation provided, including photographs, model and serial number information, and my shipping/mailing address, are true, complete, and accurate to the best of my knowledge. I confirm that the product has not been intentionally damaged, modified, or misused. I understand that, if my claim is approved, Curtis may, at its sole discretion and in accordance with the applicable warranty terms, repair or replace the product or provide a refund of the purchase price. "
                            checked={watchValues.agree2}
                            onChange={(e) => setValue("agree2", e.target.checked)}
                        />
                        <div className="flex justify-center pt-2 md:pt-4 mt-12">
                            <Button
                                loading={isSubmitting}
                                disabled={!watchValues.agree1 || !watchValues.agree2}
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