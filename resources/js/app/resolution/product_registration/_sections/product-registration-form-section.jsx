import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import Select from '@/app/_components/select';
import { Controller, useForm } from 'react-hook-form';
import { countries } from "@/app/_json/country.json";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UploadFileSection from '../../_sections/upload-file-section'; // Assuming you still want to use this for the file upload
import { useSelector } from 'react-redux';

export default function ProductRegistrationFormSection() {
    const { products } = useSelector((store) => store.app);
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            purchase_date: "",
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            model: "",
            serial_number: "",
            country: "",
            state: "",
            city: "",
            zip_code: "",
            address1: "",
            address2: "",
            files: {
                receipt: []
            }
        }
    });

    const watchValues = watch();
    const productFilter = products.slice(2);

    // Assuming states load dynamically based on selected country as in your original code
    const states = countries?.find(res => res.value === watchValues.country);

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

    const onSubmit = async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            if (key === 'files') {
                if (data.files.receipt) {
                    data.files.receipt.forEach(file => {
                        formData.append(`receipt[]`, file);
                    });
                }
            } else {
                formData.append(key, data[key] === null ? '' : data[key]);
            }
        });

        try {
            // Replace with your actual registration service
            // await toast.promise(
            //     register_product_service(formData),
            //     {
            //         pending: 'Submitting your registration...',
            //         success: 'Your product has been successfully registered.',
            //         error: 'Failed to submit the form. Please try again. ❌'
            //     }
            // );

            console.log("Form Data Submitted:", data);
            toast.success("Registration submitted successfully!");
            reset();
        } catch (error) {
            console.error("Submission failed:", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    // Validation for receipt upload
    useEffect(() => {
        register("files", {
            validate: (value) => {
                if (!value?.receipt || value.receipt.length === 0) {
                    return "Please upload a clear picture of your receipt.";
                }
                return true;
            }
        });
    }, [register]);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full flex flex-col gap-4"
            >
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="first_name"
                        label="First Name "
                        error={errors.first_name?.message}
                        required={true}
                        {...register("first_name", { required: "First name is required" })}
                    />
                    <Input
                        id="last_name"
                        label="Last Name "
                        error={errors.last_name?.message}
                        required={true}
                        {...register("last_name", { required: "Last name is required" })}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="phone"
                        type="tel"
                        label="Phone "
                        error={errors.phone?.message}
                        required={true}
                        maxLength={14}
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
                        id="email"
                        type="email"
                        label="Email "
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

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <Input
                        id="purchase_date"
                        type="date"
                        label="Purchase Date"
                        max={new Date().toISOString().split("T")[0]} // Restricts selection to today or earlier
                        error={errors.purchase_date?.message}
                        required={true}
                        {...register("purchase_date", { required: "Purchase Date is required" })}
                    />
                    <Select
                        label="Model Number"
                        name="model"
                        options={
                            productFilter?.map((res) => ({
                                ...res,
                                label: res[1],
                                value: res[1],
                            })) || []
                        }
                        value={watchValues.model}
                        onChange={(val) =>
                            setValue("model", val)
                        }
                        error={errors.model?.message}
                    />

                    <Input
                        id="serial_number"
                        label={<div className='text-xs'>Serial Number (e.g. A1234567890123456)</div>}
                        error={errors.serial_number?.message}
                        maxLength={17}
                        required={true}
                        {...register("serial_number", {
                            required: "Serial number is required",
                            pattern: {
                                value: /^A\d{16}$/,
                                message: "Invalid format. Serial number must start with 'A' followed by 16 digits."
                            },
                        })}
                    />

                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <Select
                                label="Country "
                                required
                                name="country"
                                ref={ref}
                                value={value}
                                onChange={onChange}
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
                        rules={{ required: "State" }}
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <Select
                                label="State"
                                required
                                name="state"
                                ref={ref}
                                value={value}
                                onChange={onChange}
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
                        label="City "
                        error={errors.city?.message}
                        required={true}
                        {...register("city", { required: "City is required" })}
                    />

                    <Input
                        id="zip_code"
                        label="Zip / Postal Code "
                        error={errors.zip_code?.message}
                        required={true}
                        {...register("zip_code", { required: "Zip code is required" })}
                    />


                </div>

                <Input
                    id="address1"
                    label="Address 1 "
                    error={errors.address1?.message}
                    required={true}
                    {...register("address1", { required: "Address is required" })}
                />

                <Input
                    id="address2"
                    label="Address 2"
                    error={errors.address2?.message}
                    {...register("address2")}
                />
                <div className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
                    <p>
                        Entire Picture of the Receipt that shows Date of Purchase, Name of Store,
                        Unit Description, Unit Price, Order Summary with Total Breakdown:
                    </p>
                    <p className="text-red-500 font-medium">
                        NOTE: It must be clear and readable. Not valid if required information is incomplete.
                    </p>
                    <p className="text-red-500 font-medium">
                        Photos and Receipt must be in the following file formats: .jpg, .jpeg, .png, .pdf
                    </p>

                    <div className="mt-2">
                        {/* Assuming your UploadFileSection handles the visual button/input mapping */}
                        <UploadFileSection
                            buttonText="Click to upload receipt/bill of sale."
                            files={watchValues.files || {}}
                            setFiles={(newFiles) => setValue('files', newFiles, { shouldValidate: true })}
                            error={errors.files}
                        />
                        {errors.files?.message && (
                            <span className="text-red-500 text-sm mt-1">{errors.files.message}</span>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 w-full">
                    <Button
                        loading={isSubmitting}
                        className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-3 rounded uppercase"
                        variant="primary"
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
            </form>
        </>
    );
}