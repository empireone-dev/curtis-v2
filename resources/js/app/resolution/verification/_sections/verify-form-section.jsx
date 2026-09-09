import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import { verify_serial_number_service } from '@/app/services/product-registration-service';
import { router } from '@inertiajs/react';
import { encodeBase64Id } from '@/app/lib/decode';
import { toast } from 'react-toastify';
import store from '@/app/store/store';
import { get_product_registration_by_serial_number_thunk } from '@/app/_redux/app-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '@/app/_redux/app-slice';
import useTranslation from '@/app/_hooks/useTranslation';

export default function VerifyFormSection() {
    const { t } = useTranslation();
    const { ticket } = useSelector((store) => store.app);
    const [isError, setIsError] = useState(false)
    const [isloading, setLoading] = useState(false)
    const call_type = window.location.pathname.split('/')[2]
    const dispatch = useDispatch()
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
                return router.visit(`/resolution/${call_type}/${encodeBase64Id(formData.serial_number)}`)
            }
            await dispatch(setTicket({
                id: "",
            }))
            setIsError(true)
        } catch (error) {
            console.error("Verification failed:", error);
            // Handle error logic here
        }
    };

    const serialRegex = /^A\d{16}$/;
    async function search_serial_number(e) {
        if (serialRegex.test(e.target.value)) {
            setLoading(true)
            await toast.promise(
                store.dispatch(get_product_registration_by_serial_number_thunk(e.target.value)),
                {
                    pending: 'Searching...',
                    error: 'Failed to submit the form. Please try again. ❌'
                }
            );
            setLoading(false)
        }
    }

    function is_disabled(e) {
        if (ticket?.ticket != null) {
            return true
        } else if (isloading) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            {
                isError && <div className='text-red-500 text-sm leading-relaxed text-center py-3'>{t('verification.not_found')}</div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 animate-fadeIn mt-5">
                {
                    ticket?.id === null && (
                        <div className='border border-red-500 rounded-md p-2 text-red-500 shadow-sm mb-4 bg-red-100'>
                            <div className='py-3'>
                                {t('verification.no_registration_found')}
                            </div>
                        </div>
                    )
                }
                {
                    ticket?.ticket?.id && (
                        <div className='border border-orange-500 rounded-md p-2 text-orange-500 shadow-sm mb-4 bg-orange-100'>
                            <div className='py-3'>
                                {t('form.previous_claim_notice')}
                            </div>
                            <div className='flex items-center justify-end'>
                                <Button
                                    onClick={() => window.open(`/resolution/search/${ticket?.ticket?.serial_number}`, '_blank')}
                                    variant='primary'
                                >
                                    {t('form.check_ticket_status')}
                                </Button>
                            </div>
                        </div>
                    )
                }
                <Input
                    id="serial_number"
                    label={t('form.serial_number_label')}
                    error={errors.serial_number?.message}
                    maxLength={17}
                    required={true}
                    {...register("serial_number", {
                        required: t('form.serial_number_required'),
                        pattern: {
                            value: /^A\d{16}$/,
                            // Updated the message to say 16 digits to match the regex
                            message: t('form.serial_number_invalid')
                        },
                        // Move your custom onChange inside the register function!
                        onChange: search_serial_number
                    })}
                />

                <Button
                    className="w-full"
                    variant="primary"
                    type="submit"
                    disabled={is_disabled()}
                    loading={isSubmitting}
                >
                    {isSubmitting ? t('verification.verifying') : t('verification.submit')}
                </Button>
                {
                    ticket?.id === undefined && <Button
                        className="w-full"
                        variant="danger"
                        type="button"
                        onClick={() => router.visit(`/resolution/${call_type}/confirmation`)}
                    >
                        {t('verification.go_back')}
                    </Button>
                }
            </form>
        </>
    );
}