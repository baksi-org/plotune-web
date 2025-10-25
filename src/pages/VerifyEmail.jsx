import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus('error');
      toast.error('Invalid verification link');
    }
  }, [token]);

  const verifyEmail = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.get(`/auth/verify-email?token=${token}`);
      
      if (response.status === 200) {
        setVerificationStatus('success');
        toast.success('Email verified successfully!');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Verification error:', err.response?.data);
      setVerificationStatus('error');
      toast.error(err.response?.data?.detail || 'Email verification failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerification = async () => {
    // This would typically require the user's email
    // For now, we'll show a message that they need to register again or contact support
    toast.info('Please register again or contact support for a new verification link');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-gray-900 flex items-center justify-center py-8 px-4">
      <div className="bg-dark-card rounded-2xl p-8 border border-white/10 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            verificationStatus === 'loading' ? 'bg-blue-500/20' :
            verificationStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {verificationStatus === 'loading' && (
              <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2m16.364-6.364l-2.828 2.828M7.464 17.536l-2.828 2.828m0-11.312l2.828 2.828m9.072 9.072l2.828 2.828" />
              </svg>
            )}
            {verificationStatus === 'success' && (
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {verificationStatus === 'error' && (
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-light-text mb-2">
            {verificationStatus === 'loading' && 'Verifying Email'}
            {verificationStatus === 'success' && 'Email Verified!'}
            {verificationStatus === 'error' && 'Verification Failed'}
          </h1>
          
          <p className="text-gray-text">
            {verificationStatus === 'loading' && 'Please wait while we verify your email address...'}
            {verificationStatus === 'success' && 'Your email has been successfully verified.'}
            {verificationStatus === 'error' && 'We could not verify your email address.'}
          </p>
        </div>

        {verificationStatus === 'loading' && (
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying your email...
            </div>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 text-sm font-medium">
                  Your email has been successfully verified. You will be redirected to login shortly.
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link
                to="/login"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 font-medium text-center"
              >
                Go to Login
              </Link>
              <Link
                to="/"
                className="w-full py-3 bg-dark-surface text-gray-text border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-300 font-medium text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-400 text-sm font-medium">
                  The verification link is invalid or has expired. Please request a new verification email.
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={resendVerification}
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Resend Verification Email'
                )}
              </button>
              
              <Link
                to="/register"
                className="w-full py-3 bg-dark-surface text-gray-text border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-300 font-medium text-center"
              >
                Create New Account
              </Link>
              
              <Link
                to="/login"
                className="w-full py-3 text-primary hover:underline text-sm text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Additional help section */}
        {(verificationStatus === 'error') && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-text text-sm text-center">
              Need help?{' '}
              <a href="mailto:support@plotune.net" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;