import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import Select from '@/app/_components/select';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { countries } from "@/app/_json/country.json";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Checkbox from '@/app/_components/checkbox';
import Textarea from '@/app/_components/textarea';
import UploadFileSection from '../../_sections/upload-file-section';
import { create_ticket_service } from '@/app/services/tickets-service';
import Radio from '@/app/_components/radio';

export default function FormSection() {
    const { product_registration, products } = useSelector((store) => store.app);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        setValue, // We will use this to loop through our redux state
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
                receipt: [],
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
            formData.append('call_type', 'CF-Warranty Claim');
            await create_ticket_service(formData);
            alert("Ticket created successfully!");

        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit the form. Please try again.");
        } finally {
        }
    };

    useEffect(() => {
        register("files", {
            validate: (value) => {
                const requiredCategories = ['modelSerial', 'receipt', 'issueEvidence'];

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
    const is_under_45_days = watchValues.purchase_date && moment(watchValues.purchase_date).isAfter(moment().subtract(45, 'days'));

    // TRUE if the item is older (46+ days ago)
    const is_over_45_days = watchValues.purchase_date && moment(watchValues.purchase_date).isBefore(moment().subtract(45, 'days'));
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white w-full flex flex-col gap-3 min-h-[70vh]"
            >
                {
                    is_under_45_days && (
                        <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4'>
                            The purchase was within the last 45 days. For faster resolution, please return it to the retailer for refund or replacement.
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
                        required={true}
                        {...register("serial_number", {
                            required: "Serial number is required",
                            pattern: {
                                value: /^A\d{16}$/,
                                message: "Invalid format. Serial number must start with 'A' followed by 15 digits."
                            },
                        })}
                    />
                </div>

                <div className=' flex flex-col gap-3'>
                    {
                        (watchValues.purchase_date && call_type == 'warranty' && is_under_45_days) && <>
                            Have you tried contacting the store for the return policy?
                            <div className='flex gap-8 my-3'>
                                <Radio
                                    name="has_contacted_store"
                                    label="Yes"
                                    // Evaluates to true ONLY if the current value is strictly 'Yes'
                                    checked={watchValues.has_contacted_store === 'Yes'}
                                    onChange={() => setValue("has_contacted_store", 'Yes')}
                                />

                                <Radio
                                    name="has_contacted_store"
                                    label="No"
                                    // Evaluates to true ONLY if the current value is strictly 'No'
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
                    (watchValues.has_contacted_store == 'Yes' || is_over_45_days) && <>
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
                                required={true}
                                // {...register("item_number", { required: "Item number is required" })}
                                error={errors.item_number?.message}
                            />
                            <Input
                                id="unit"
                                label="Item Unit"
                                error={errors.unit?.message}
                                required={true}
                                disabled
                                {...register("unit", { required: "Item unit is required" })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <Input
                                id="brand"
                                label="Brand"
                                disabled
                                error={errors.brand?.message}
                                required={true}
                                {...register("brand", { required: "Brand identification is required" })}
                            />
                            <Input
                                id="class"
                                disabled
                                label="Item Class"
                                error={errors.class?.message}
                                required={true}
                                {...register("class", { required: "Item class is required" })}
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
                            <Select
                                label="Country"
                                required
                                name="country"
                                options={
                                    countries?.map((res) => ({
                                        ...res,
                                        label: res.name,
                                        value: res.value,
                                    })) || []
                                }
                                value={watchValues.country}
                                onChange={(val) =>
                                    setValue("country", val)
                                }
                                error={errors.country?.message}
                            />


                            <Select
                                label="State"
                                required
                                name="state"
                                options={
                                    states?.regions?.map((res) => ({
                                        ...res,
                                        label: res.name,
                                        value: res.value,
                                    })) || []
                                }
                                value={watchValues.state}
                                onChange={(val) =>
                                    setValue("state", val)
                                }
                                error={errors.state?.message}
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