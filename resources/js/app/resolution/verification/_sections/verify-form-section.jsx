import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import { verify_serial_number_service } from '@/app/services/product-registration-service';
import { router } from '@inertiajs/react';
import { encodeBase64Id } from '@/app/lib/decode';

export default function VerifyFormSection() {
    const [isError, setIsError] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            serial_number: '',
        }
    });

    const watchValues = watch()

    const onSubmit = async (formData) => {
        setIsError(false)
        try {
            const res = await verify_serial_number_service(formData.serial_number);
            if (Object.keys(res).length != 0) {
                return router.visit(`/resolution/warranty/${encodeBase64Id(res.id)}`)
            }
            setIsError(true)
        } catch (error) {
            console.error("Verification failed:", error);
            // Handle error logic here
        }
    };
    return (
        <>
            {
                isError && <div className='text-red-500 text-sm leading-relaxed text-center py-3'>Not found on the record!</div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 animate-fadeIn mt-5">

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


                <Button
                    className="w-full"
                    variant="primary"
                    type="submit"
                    disabled={watchValues.serial_number.length != 17}
                    loading={isSubmitting}
                >
                    {isSubmitting ? 'VERIFYING...' : 'SUBMIT'}
                </Button>
                {
                    isError && <Button
                        className="w-full"
                        variant="danger"
                        type="submit"
                        onClick={() => router.visit('/resolution/confirmation')}
                    >
                        GO BACK
                    </Button>
                }
            </form>
        </>
    );
}