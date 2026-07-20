import React, { useEffect } from 'react'
import UploadFileSection from '../_sections/upload-file-section'
import { useForm } from 'react-hook-form';
import { upload_lacking_information_service } from '@/app/services/tickets-service';
import { toast } from 'react-toastify';
import Button from '@/app/_components/button';
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { get_ticket_by_serial_number_thunk } from '@/app/_redux/app-thunk';
import { router } from '@inertiajs/react';

export default function UploadLackingInformationSection() {
    const { ticket: ticket_info } = useSelector((store) => store.app);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            remarks: "Calling From:\nStore:\nPurchase Date:\nIssue:\nRemarks:",
            files: {
                readable_serial_section: [],
                bill_of_sale: [],
                defect_issue: []
            },
            uploaded_files: {
                readable_serial_section: [],
                bill_of_sale: [],
                defect_issue: []
            }
        }
    });

    const watchValues = watch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const rawLackings = urlParams.get('lackings');
    const lackings = rawLackings ? rawLackings.split(',') : [];

    useEffect(() => {
        if (ticket_info && ticket_info.files) {
            const serialFiles = ticket_info.files.filter(res => res.type === 'readable_serial_section');
            const billFiles = ticket_info.files.filter(res => res.type === 'bill_of_sale');
            const defectFiles = ticket_info.files.filter(res => res.type === 'defect_issue');
            setValue('uploaded_files.readable_serial_section', serialFiles);
            setValue('uploaded_files.bill_of_sale', billFiles);
            setValue('uploaded_files.defect_issue', defectFiles);
        }
    }, [ticket_info, setValue]);

    useEffect(() => {
        register("files", {
            validate: (value) => {
                // If there are no lackings, technically no files are required to be uploaded
                if (lackings.length === 0) return true;

                // Dynamically check ONLY the categories requested in the `lackings` array
                const missingCategories = lackings.filter(
                    (id) => !value?.[id] || value[id].length === 0
                );

                if (missingCategories.length > 0) {
                    return "Please upload all the required missing files.";
                }
                return true;
            }
        });
    }, [register, rawLackings]);


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
            }
        });

        try {
            const serialNumber = window.location.pathname.split('/')[3];
            const toastId = toast.loading('Uploading files...');
            formData.append('call_type', ticket_info.call_type);
            formData.append('id', ticket_info.id);

            await upload_lacking_information_service(formData);
            await store.dispatch(get_ticket_by_serial_number_thunk(serialNumber));
            toast.update(toastId, {
                render: 'Files uploaded successfully! 🛠️',
                type: 'success',
                closeButton: true,
                isLoading: false,
            });

            setValue('files.readable_serial_section', []);
            setValue('files.bill_of_sale', []);
            setValue('files.defect_issue', []);
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit the form. Please try again.");
        }
    };

    // Updated this to be dynamic as well, just in case you use it elsewhere in your UI
    const hasUploadedFiles = lackings.every(
        id => watchValues?.uploaded_files?.[id]?.length > 0
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <UploadFileSection
                files={watchValues.files || {}}
                setFiles={(newFiles) => setValue('files', newFiles, { shouldValidate: true })}
                error={errors.files}
                watchValues={watchValues}
            />
            {
                lackings.length !== 0 && (
                    <Button
                        loading={isSubmitting}
                        className="w-full"
                        variant="primary"
                        type="submit"
                    >
                        UPLOAD
                    </Button>
                )
            }
        </form>
    )
}