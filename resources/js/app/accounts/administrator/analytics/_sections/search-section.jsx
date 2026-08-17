import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DateRangePicker from '@/app/_components/date-range';
import { router } from '@inertiajs/react';
import Button from '@/app/_components/button';
import Select from '@/app/_components/select';

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

export default function SearchSection() {
    // 1. Calculate the fallback 1-week range
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    const fallbackDateRange = `${formatDate(oneWeekAgo)},${formatDate(today)}`;

    // 2. Parse the current URL query parameters (with a check for SSR safety if using SSR)
    const searchParams = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    // 3. Extract the values from the URL, or use the fallbacks if not present
    const urlDateRange = searchParams.get('date_range') || fallbackDateRange;
    const urlCallType = searchParams.get('call_type') || '';

    // 4. Initialize useForm with the extracted values
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            date_range: urlDateRange,
            call_type: urlCallType
        }
    });

    // Watch all form values to power the controlled components
    const watchValues = watch();

    // Update submission to handle multiple dynamic query parameters safely
    const onSubmit = (data) => {
        const queryParams = new URLSearchParams();

        if (data.date_range) {
            queryParams.append('date_range', data.date_range);
        }

        if (data.call_type) {
            queryParams.append('call_type', data.call_type);
        }

        // Visits something like: "?date_range=2023-10-11,2023-10-18&call_type=Parts"
        router.visit(`?${queryParams.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3'>
            <Controller
                name="date_range"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                    const [start = '', end = ''] = (value || '').split(',');

                    return (
                        <DateRangePicker
                            label="Select Date Range"
                            startDate={start}
                            endDate={end}
                            maxDate={formatDate(new Date())} // <-- Restricts selection to today or earlier
                            error={error}
                            onDateChange={(dates) => {
                                if (dates?.start || dates?.end) {
                                    onChange(`${dates?.start || ''},${dates?.end || ''}`);
                                } else {
                                    onChange('');
                                }
                            }}
                        />
                    );
                }}
            />

            <Select
                label="Call Type"
                name="call_type"
                options={
                    [
                        'CF-Warranty Claim',
                        'Parts',
                        'TS-Tech Support',
                        'Others'
                    ].map((res) => ({
                        label: res,
                        value: res,
                    }))
                }
                value={watchValues.call_type}
                onChange={(val) =>
                    setValue("call_type", val, { shouldValidate: true })
                }
                required={true}
                error={errors.call_type?.message}
            />

            <Button
                type='submit'
                variant='primary'>
                SEARCH
            </Button>
        </form>
    );
}