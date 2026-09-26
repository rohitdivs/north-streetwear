'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    sendLoginOtp,
    verifyLoginOtp,
    loginUser,
    registerUser,
    pendingUserOtp,
    setPendingUserOtp
  } = useShop();

  // Login Mode: 'otp' | 'password'
  const [loginMode, setLoginMode] = useState('otp');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [otpCodeInput, setOtpCodeInput] = useState('');

  // Register Form
  const [registerName, setRegisterName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  // Handler: Request OTP for Login
  const handleRequestOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = sendLoginOtp(loginIdentifier);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error);
      } else {
        setOtpCodeInput('');
      }
    }, 400);
  };

  // Handler: Verify OTP and Sign In
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = verifyLoginOtp(otpCodeInput);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error);
      } else {
        setLoginIdentifier('');
        setOtpCodeInput('');
      }
    }, 400);
  };

  // Handler: Password Login
  const handlePasswordLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginUser({
        identifier: loginIdentifier,
        password: loginPassword
      });

      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error);
      } else {
        setLoginIdentifier('');
        setLoginPassword('');
      }
    }, 400);
  };

  // Handler: Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = registerUser({
        name: registerName,
        username: registerUsername,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword
      });

      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error);
      } else {
        setRegisterName('');
        setRegisterUsername('');
        setRegisterEmail('');
        setRegisterPhone('');
        setRegisterPassword('');
      }
    }, 400);
  };

  const fillQuickIdentifier = (id) => {
    setLoginIdentifier(id);
    setErrorMsg('');
    setPendingUserOtp(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div 
        className="auth-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          width: '92%',
          background: 'rgba(17, 17, 20, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
          position: 'relative',
          color: '#f3f4f6',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setPendingUserOtp(null);
          }}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#9ca3af',
            fontSize: '1.5rem',
            cursor: 'pointer',
            lineHeight: 1
          }}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'inline-block',
            letterSpacing: '0.25em',
            fontSize: '1.3rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '4px'
          }}>
            NORTH
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Streetwear Community Portal
          </div>
        </div>

        {/* Main Tab Switcher (Sign In vs Create Account) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            type="button"
            onClick={() => { setAuthModalTab('login'); setErrorMsg(''); }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.84rem',
              transition: 'all 0.2s',
              background: authModalTab === 'login' ? '#ffffff' : 'transparent',
              color: authModalTab === 'login' ? '#0a0a0c' : '#9ca3af'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalTab('register'); setErrorMsg(''); setPendingUserOtp(null); }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.84rem',
              transition: 'all 0.2s',
              background: authModalTab === 'register' ? '#ffffff' : 'transparent',
              color: authModalTab === 'register' ? '#0a0a0c' : '#9ca3af'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#f87171',
            fontSize: '0.82rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SIGN IN VIEW: DIRECT OTP LOGIN (PRIMARY) OR PASSWORD LOGIN
        ══════════════════════════════════════════════════════════════════ */}
        {authModalTab === 'login' && (
          <div>
            {/* Sub-toggle: OTP Login vs Password Login */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '0.78rem' }}>
              <button
                type="button"
                onClick={() => { setLoginMode('otp'); setErrorMsg(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: loginMode === 'otp' ? '2px solid var(--accent, #eab308)' : '2px solid transparent',
                  color: loginMode === 'otp' ? '#fff' : '#9ca3af',
                  fontWeight: loginMode === 'otp' ? 700 : 500,
                  paddingBottom: '4px',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-mobile-screen-button"></i> Login via OTP (Direct)
              </button>
              <button
                type="button"
                onClick={() => { setLoginMode('password'); setErrorMsg(''); setPendingUserOtp(null); }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: loginMode === 'password' ? '2px solid var(--accent, #eab308)' : '2px solid transparent',
                  color: loginMode === 'password' ? '#fff' : '#9ca3af',
                  fontWeight: loginMode === 'password' ? 700 : 500,
                  paddingBottom: '4px',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-key"></i> Login via Password
              </button>
            </div>

            {/* DIRECT OTP LOGIN */}
            {loginMode === 'otp' && (
              <div>
                {!pendingUserOtp ? (
                  <form onSubmit={handleRequestOtp}>
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Username, Email, or Mobile Number
                      </label>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. aryan, admin, or 9820149201"
                        required
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#ffffff',
                        color: '#000000',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        transition: 'opacity 0.2s',
                        opacity: isLoading ? 0.7 : 1
                      }}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send Login OTP Code →'}
                    </button>
                  </form>
                ) : (
                  /* OTP VERIFICATION VIEW */
                  <form onSubmit={handleVerifyOtp}>
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.25)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      marginBottom: '1rem',
                      fontSize: '0.76rem',
                      color: '#86efac'
                    }}>
                      OTP transmitted to <strong>{pendingUserOtp.targetUser?.email}</strong> & <strong>+91 {pendingUserOtp.targetUser?.phone}</strong>
                    </div>

                    {/* Auto-Fill OTP Helper Box */}
                    <div style={{
                      background: 'rgba(234, 179, 8, 0.1)',
                      border: '1px solid rgba(234, 179, 8, 0.3)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      marginBottom: '1.2rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#fef08a', display: 'block' }}>DEMO LOGIN OTP</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '4px', color: '#fff' }}>
                          {pendingUserOtp.otp}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpCodeInput(pendingUserOtp.otp)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          background: '#eab308',
                          color: '#000',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          cursor: 'pointer'
                        }}
                      >
                        Auto-Fill
                      </button>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Enter 6-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCodeInput}
                        onChange={(e) => setOtpCodeInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        required
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          letterSpacing: '8px',
                          textAlign: 'center',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otpCodeInput.length < 6}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#22c55e',
                        color: '#000000',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        cursor: (isLoading || otpCodeInput.length < 6) ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        opacity: (isLoading || otpCodeInput.length < 6) ? 0.6 : 1
                      }}
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP & Log In'}
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.85rem' }}>
                      <button
                        type="button"
                        onClick={() => sendLoginOtp(loginIdentifier)}
                        style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Resend OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingUserOtp(null)}
                        style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Change Username/Phone
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* PASSWORD LOGIN */}
            {loginMode === 'password' && (
              <form onSubmit={handlePasswordLoginSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Username, Email, or Mobile Number
                  </label>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. aryan, admin, or 9820149201"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#ffffff',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In with Password'}
                </button>
              </form>
            )}

            {/* Quick Demo Accounts Helper */}
            <div style={{
              marginTop: '1.25rem',
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              fontSize: '0.75rem',
              color: '#9ca3af'
            }}>
              <div style={{ fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                Quick Demo Accounts (Direct OTP / Password):
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => fillQuickIdentifier('admin')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(234, 179, 8, 0.15)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    color: 'var(--accent, #eab308)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  Admin (@admin)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickIdentifier('aryan')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#e5e7eb',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  Aryan (@aryan)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickIdentifier('9876543210')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#e5e7eb',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  Rohit (Mobile: 9876543210)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            CREATE ACCOUNT TAB
        ══════════════════════════════════════════════════════════════════ */}
        {authModalTab === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: '8px',
              padding: '8px 12px',
              marginBottom: '1rem',
              fontSize: '0.74rem',
              color: '#93c5fd'
            }}>
              ℹ️ <strong>Requirements:</strong> Both Email & 10-digit Mobile Number are mandatory.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="e.g. Kabir Bedi"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Username *
                </label>
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="e.g. kabir_99"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address * (Mandatory)
              </label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="name@domain.com"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Mobile Number * (10 Digits Mandatory)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{
                  padding: '9px 10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#9ca3af',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98XXXXXXXX (10 digits)"
                  required
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Create Password * (Min 6 chars)
              </label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Choose account password"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Creating Account...' : 'Complete VIP Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
