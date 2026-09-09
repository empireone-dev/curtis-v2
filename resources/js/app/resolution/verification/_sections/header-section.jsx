import React, { useState } from 'react';
import useTranslation from '@/app/_hooks/useTranslation';

export default function HeaderSection() {
    const { t } = useTranslation();
    return (
           <div className="text-center">
                <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 block drop-shadow-sm">
                    {t('verification.unit_lookup')}
                </span>
                <h2 className="text-2xl font-semibold text-gray-800">
                    {t('verification.enter_serial_number')}
                </h2>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    {t('verification.lookup_description')}
                </p>
                
                    <span className="text-gray-400 text-xs mt-2 ml-1">
                        {t('verification.serial_note')}
                    </span>
            </div>
    );
}