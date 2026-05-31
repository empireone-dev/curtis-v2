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
import { get_ticket_by_ticket_id_thunk } from '@/app/_redux/app-thunk';

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
            issue: null,
            has_contacted_store: null,
            store_refusal_reason: null,
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
        }

    }, [watchValues.item_number])

    useEffect(() => {
        if (product_registration?.id) {
            const searching = product_registration?.model === '' ? null : product_registration?.model?.toLowerCase();

            const searchProductsList = productFilter.find((product) =>
                product.some((value) => typeof value === 'string' && value?.toLowerCase().includes(searching))
            );
            setValue('unit', searchProductsList[2] ?? '');
            setValue('brand', searchProductsList[0] ?? '');
            setValue('class', searchProductsList[3] ?? '');
            if (product_registration && typeof product_registration === 'object') {
                Object.keys(product_registration).forEach((key) => {
                    // Map the 'model' key from Redux to the 'item_number' form input
                    if (key === 'model') {
                        setValue('item_number', product_registration[key]);
                    } if (key === 'serial') {
                        setValue('serial_number', product_registration[key]);
                    } if (key === 'address1') {
                        setValue('address', product_registration[key]);
                    } if (key === 'zipcode') {
                        setValue('zip_code', product_registration[key]);
                    } else {
                        // Set all other fields normally
                        setValue(key, product_registration[key]);
                    }
                });
            }
        }

    }, [product_registration, setValue]);

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
                    success: 'Ticket created successfully! 🛠️',
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
                // 'bill_of_sale' has been removed from the required list
                const requiredCategories = ['readable_serial_section', 'receipt_model'];

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
                store.dispatch(get_ticket_by_ticket_id_thunk(e.target.value)),
                {
                    pending: 'Searching...',
                    error: 'Failed to submit the form. Please try again. ❌'
                }
            );
        }
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white w-full flex flex-col gap-3 min-h-[70vh]"
            >

                {
                    ticket?.id && (
                        <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4 bg-red-100'>
                            <div>
                                A previous claim has been identified for this serial number. If you believe this information is incorrect or would like us to review it further, please check here to dispute this finding

                            </div>
                            <div className='flex items-center justify-end'>
                                <Button
                                    onClick={() => window.open(`/resolution/search/${ticket.ticket_id}`, '_blank')}
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
                        max={new Date().toISOString().split("T")[0]} // Restricts selection to today or earlier
                        error={errors.purchase_date?.message}
                        required={true}
                        {...register("purchase_date", { required: "Purchase Date is required" })}
                    />

                    <Input
                        id="serial_number"
                        label="Serial Number (e.g. A1234567890123456)"
                        error={errors.serial_number?.message}
                        maxLength={17}
                        // required={true}
                        {...register("serial_number", {
                            pattern: {
                                value: /^A\d{16}$/,
                                message: "Invalid format. Serial number must start with 'A' followed by 15 digits."
                            },
                        })}
                        onChange={search_serial_number}
                    />
                </div>
                {
                    !ticket?.id && <>
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
                                {...register("phone", { required: "Phone number is required" })}
                            />
                            <Input
                                id="phone2"
                                type="tel"
                                label="Secondary Phone Number"
                                error={errors.phone2?.message}
                                {...register("phone2")}
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

                        <div className="w-full">
                            <Textarea
                                name="issue"
                                label="Detailed explanation of the issue."
                                {...register("issue", { required: "Issue is required" })}
                                error={errors.issue?.message}
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