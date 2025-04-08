const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body prose">
            <h1 className="text-3xl font-bold text-center mb-8">BlinkBuy Terms and Conditions</h1>

            <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
            <p>
              Welcome to BlinkBuy! By accessing or using our e-commerce platform (the "Service"),
              you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree
              to these Terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use BlinkBuy. By using the Service, you
              represent and warrant that you meet this age requirement and have the legal
              capacity to enter into these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6">3. Account Registration</h2>
            <p>
              To make purchases, you must create an account. You agree to provide accurate,
              current, and complete information during registration and to update such
              information as needed. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities under your account.
            </p>

            <h2 className="text-2xl font-semibold mt-6">4. Products and Pricing</h2>
            <p>
              BlinkBuy strives to provide accurate product descriptions and pricing. However,
              we do not warrant that product descriptions or prices are error-free. We reserve
              the right to correct any errors and to cancel orders if a product is mispriced.
            </p>

            <h2 className="text-2xl font-semibold mt-6">5. Payment Terms</h2>
            <p>
              All payments must be made through the payment methods offered on the platform.
              You agree to pay all charges incurred, including applicable taxes and shipping
              fees, at the time of purchase. All sales are final unless otherwise stated in
              our Return Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-6">6. Shipping and Delivery</h2>
            <p>
              BlinkBuy will make reasonable efforts to deliver products within the estimated
              timeframes. However, we are not responsible for delays caused by shipping
              carriers, weather, or other factors beyond our control.
            </p>

            <h2 className="text-2xl font-semibold mt-6">7. Returns and Refunds</h2>
            <p>
              Please refer to our separate Return Policy for details on returns and refunds.
              Items must be returned within 30 days of delivery in their original condition
              to be eligible for a refund or exchange, subject to our discretion.
            </p>

            <h2 className="text-2xl font-semibold mt-6">8. Intellectual Property</h2>
            <p>
              All content on BlinkBuy, including text, images, logos, and designs, is owned
              by or licensed to us and protected by copyright and trademark laws. You may
              not reproduce, distribute, or use this content without our prior written consent.
            </p>

            <h2 className="text-2xl font-semibold mt-6">9. User Conduct</h2>
            <p>
              You agree not to use BlinkBuy for any unlawful purpose or in any way that could
              harm the platform, its users, or third parties. Prohibited activities include
              fraud, posting harmful content, or attempting to disrupt the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-6">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, BlinkBuy shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of the
              Service, including but not limited to loss of profits or data.
            </p>

            <h2 className="text-2xl font-semibold mt-6">11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to the
              Service at our sole discretion, with or without notice, for any violation of
              these Terms or for any other reason.
            </p>

            <h2 className="text-2xl font-semibold mt-6">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              [Insert Jurisdiction, e.g., "the State of California"], without regard to its
              conflict of law principles.
            </p>

            <h2 className="text-2xl font-semibold mt-6">13. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of significant
              changes via email or through the Service. Your continued use of BlinkBuy after
              such changes constitutes acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6">14. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: support@blinkbuy.com
              <br />
              Phone: 1-800-BLINKBUY
              <br />
              Address: 123 Commerce Street, E-Shop City, CA 90210
            </p>

            <div className="mt-8 text-center">
              <p className="text-sm text-base-content/60">
                Last Updated: April 08, 2025
              </p>
            </div>
            <a href="/register" className="btn btn-primary">
              Back to SignUp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;