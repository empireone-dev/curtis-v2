import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import Select from '@/app/_components/select';
import { Controller, useForm } from 'react-hook-form';
import { countries } from "@/app/_json/country.json";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import UploadFileSection from '../../_sections/upload-file-section';
import { useSelector, useDispatch } from 'react-redux';
import { create_product_registration_service } from '@/app/services/product-registration-service';
import { get_product_registration_by_serial_number_thunk } from '@/app/_redux/app-thunk';

export default function ProductRegistrationFormSection() {
    const { products, ticket } = useSelector((store) => store.app);
    const dispatch = useDispatch();

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
            fname: "",
            lname: "",
            phone: "",
            email: "",
            model: "",
            serial: "",
            country: "",
            state: "",
            city: "",
            zipcode: "",
            address1: "",
            address2: "",
            files: {
                bill_of_sale: []
            }
        }
    });

    const watchValues = watch();
    const productFilter = products.slice(2);

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
                Object.keys(data.files).forEach(category => {
                    data.files[category].forEach(file => {
                        // Use category[] so PHP receives an array of files per category
                        formData.append(`${category}[]`, file);
                    });
                });
            } else {
                formData.append(key, data[key] === null ? '' : data[key]);
            }
        });
        try {
            await toast.promise(
                create_product_registration_service(formData),
                {
                    pending: 'Submitting your registration...',
                    success: 'Your product has been successfully registered.',
                    error: 'Failed to submit the form. Please try again. ❌'
                }
            );
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
                const requiredCategories = ['bill_of_sale'];
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
    const serialRegex = /^A\d{16}$/;

    async function search_serial_number(e) {
        if (serialRegex.test(e.target.value)) {
            await toast.promise(
                dispatch(get_product_registration_by_serial_number_thunk(e.target.value)),
                {
                    pending: 'Searching...',
                    error: 'Failed to find registration. Please try again. ❌'
                }
            );
        }
    }

    // Unified check for whether a ticket is registered
    const isTicketRegistered = ticket?.id || ticket?.ticket?.id;

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full flex flex-col gap-4"
            >
                {
                    isTicketRegistered && (
                        <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4 bg-red-100'>
                            This serial number is already registered.
                        </div>
                    )
                }
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">

                    <Input
                        id="serial"
                        label={<div className='text-xs'>Serial Number (e.g. A1234567890123456)</div>}
                        error={errors.serial?.message}
                        maxLength={17}
                        required={true}
                        {...register("serial", {
                            required: "Serial number is required",
                            pattern: {
                                value: serialRegex,
                                message: "Invalid format. Serial number must start with 'A' followed by 16 digits."
                            },
                            onChange: search_serial_number // Fixed: React Hook Form safe onChange
                        })}
                    />


                    <Input
                        id="purchase_date"
                        type="date"
                        label="Purchase Date"
                        disabled={ticket?.ticket?.id}
                        max={new Date().toISOString().split("T")[0]}
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

                    <Select
                        label="Model Number"
                        name="model"
                        required
                        {...register("model", {
                            required: "Model Number is required",
                        })}
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

                </div>

                {
                    !isTicketRegistered && <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                id="fname"
                                label="First Name "
                                error={errors.fname?.message}
                                required={true}
                                {...register("fname", { required: "First name is required" })}
                            />
                            <Input
                                id="lname"
                                label="Last Name "
                                error={errors.lname?.message}
                                required={true}
                                {...register("lname", { required: "Last name is required" })}
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
                                id="zipcode"
                                label="Zip / Postal Code "
                                error={errors.zipcode?.message}
                                required={true}
                                {...register("zipcode", { required: "Zip code is required" })}
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
                    </>
                }

            </form>
        </>
    );
}