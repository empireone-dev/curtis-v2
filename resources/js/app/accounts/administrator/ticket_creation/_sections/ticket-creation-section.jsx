import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import Select from '@/app/_components/select';
import { router } from '@inertiajs/react';
import { Controller, useForm } from 'react-hook-form';
import { countries } from "@/app/_json/country.json";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from '@/app/_components/checkbox';
import Textarea from '@/app/_components/textarea';
import { create_ticket_service, validate_email_service } from '@/app/services/tickets-service';
import { toast } from 'react-toastify';
import store from '@/app/store/store';
import { get_product_registration_by_serial_number_thunk } from '@/app/_redux/app-thunk';

export default function TicketCreationSection() {
    const { product_registration, products, ticket } = useSelector((store) => store.app);

    const [isValidEmail, setIsValidEmail] = useState(false)

    const debounceTimer = useRef(null);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        setValue, // We will use this to loop through our redux state
        reset,
        clearErrors,
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
            isAgree: false,
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
            validate_email({
                target: {
                    value: ticket?.email
                }
            });
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
            await create_ticket_service(formData);
            router.visit(`/resolution/success/${data.serial_number}`)
            reset();
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit the form. Please try again.");
        }
    };

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

    const validate_email = (e) => {
        register("email").onChange(e);

        const emailValue = e.target.value;

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            if (emailValue) {
                setIsValidEmail(false)
                setError('email', {
                    type: 'manual',
                    message: 'Validating email, please wait...'
                });
                const result = await validate_email_service(emailValue);
                setIsValidEmail(result.valid)
                if (!result.valid) {
                    setError('email', {
                        type: 'manual',
                        message: 'Email address not found!'
                    })
                } else {
                    clearErrors('email');
                }
            }
        }, 3000);
    };

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

    return (
        <div className='flex w-full items-center justify-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="max-w-6xl items-center justify-center w-full flex flex-col gap-3"
            >
                <div className="flex items-center gap-3 mb-3">

                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                                Create New Support Ticket
                            </h1>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                New Draft
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                            Fill out the customer and product details below to log a new ticket.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <Input
                        id="serial_number"
                        label="Serial Number (e.g. A1234567890123456)"
                        error={errors.serial_number?.message}
                        maxLength={17}
                        {...register("serial_number", {
                            pattern: {
                                value: /^A\d{16}$/,
                                message: "Invalid format. Serial number must start with 'A' followed by 16 digits."
                            },
                            onChange: search_serial_number
                        })}
                    />
                    <Input
                        id="purchase_date"
                        type="date"
                        label="Purchase Date"
                        max={new Date().toISOString().split("T")[0]}
                        error={errors.purchase_date?.message}
                        {...register("purchase_date")}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <Input
                        id="fname"
                        label="First Name"
                        error={errors.fname?.message}
                        {...register("fname")}
                    />
                    <Input
                        id="lname"
                        label="Last Name"
                        error={errors.lname?.message}
                        {...register("lname")}
                    />
                </div>

                <Input
                    id="email"
                    type="email"
                    label="Email"
                    error={errors.email?.message}
                    {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    onChange={validate_email}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <Input
                        id="phone"
                        type="tel"
                        label="Phone Number"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
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
                        {...register("unit")}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                    <Input
                        id="brand"
                        label="Brand"
                        error={errors.brand?.message}
                        {...register("brand")}
                    />
                    <Input
                        id="class"
                        label="Item Class"
                        error={errors.class?.message}
                        {...register("class")}
                    />
                </div>

                <div className="w-full">
                    <Input
                        id="address"
                        label="Physical Address"
                        error={errors.address?.message}
                        {...register("address")}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
                    <Controller
                        name="country"
                        control={control}
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <Select
                                label="Country"
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
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <Select
                                label="State"
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
                        label="City"
                        error={errors.city?.message}
                        {...register("city")}
                    />
                    <Input
                        id="zip_code"
                        label="Zip Code / Postal Code"
                        error={errors.zip_code?.message}
                        {...register("zip_code")}
                    />
                </div>

                <div className='w-full'>
                    <Checkbox
                        id="has_address_2"
                        className='my-3'
                        checked={watchValues.has_address_2}
                        label="My physical address is the same as my mailing address."
                        onChange={(val) =>
                            setValue("has_address_2", val.target.checked)
                        }
                    />
                </div>

                {!watchValues.has_address_2 && (
                    <>
                        <div className="w-full">
                            <Input
                                id="address_2"
                                label="Mailing Address"
                                error={errors.address_2?.message}
                                {...register("address_2")}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
                            <Controller
                                name="country_2"
                                control={control}
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <Select
                                        label="Country"
                                        name="country_2"
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
                                name="state_2"
                                control={control}
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <Select
                                        label="State"
                                        name="state_2"
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
                                id="city_2"
                                label="City"
                                error={errors.city_2?.message}
                                {...register("city_2")}
                            />
                            <Input
                                id="zip_code_2"
                                label="Zip Code / Postal Code"
                                error={errors.zip_code_2?.message}
                                {...register("zip_code_2")}
                            />
                        </div>
                    </>
                )}

                <div className="w-full">
                    <Textarea
                        name="detailed_explanation_issue"
                        label="Detailed explanation of the issue."
                        {...register("detailed_explanation_issue")}
                        error={errors.detailed_explanation_issue?.message}
                    />
                </div>

                <div className="flex justify-center pt-2 md:pt-4 mt-12">
                    <Button
                        loading={isSubmitting}
                        className="w-full sm:w-auto px-12"
                        variant="primary"
                        type="submit"
                    >
                        SUBMIT
                    </Button>
                </div>
            </form>
        </div>
    );
}