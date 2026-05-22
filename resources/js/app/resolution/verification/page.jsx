import React from 'react'
import Layout from '../layout'
import HeaderSection from './_sections/header-section'
import VerifyFormSection from './_sections/verify-form-section'

export default function Page() {
  return (
    <Layout>
       <HeaderSection />
       <VerifyFormSection />
    </Layout>
  )
}
