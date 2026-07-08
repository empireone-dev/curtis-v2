import React, { useEffect } from 'react'
import UploadFileSection from '../_sections/upload-file-section'
import { useForm } from 'react-hook-form';
import { upload_lacking_information_service } from '@/app/services/tickets-service';
import { toast } from 'react-toastify';
import Button from '@/app/_components/button';
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { get_ticket_by_serial_number_thunk } from '@/app/_redux/app-thunk';

export default function UploadLackingInformationSection() {

    const { ticket: ticket_info } = useSelector((store) => store.app);
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
    const watchValues = watch()

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
            formData.append('call_type', 'CF-Warranty Claim');
            await upload_lacking_information_service(formData);
            await store.dispatch(get_ticket_by_serial_number_thunk(serialNumber));
            toast.update(toastId, {
                render: 'Files uploaded successfully! 🛠️',
                type: 'success',
                isLoading: false,
                autoClose: 3000 // Automatically close after 3 seconds
            });
            reset();
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit the form. Please try again.");
        } finally {
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <UploadFileSection
                files={watchValues.files || {}}
                setFiles={(newFiles) => setValue('files', newFiles, { shouldValidate: true })}
                error={errors.files}
                watchValues={watchValues}
            />
            <Button
                loading={isSubmitting}
                className="w-full "
                variant="primary"
                type="submit"
            >
                UPLOAD
            </Button>
        </form>
    )
}
