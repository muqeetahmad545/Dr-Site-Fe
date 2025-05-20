import React, { useState } from 'react';

const PatientLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!email || !password) return;

    // Simulate OTP trigger (you can replace with real login logic)
    setShowOtp(true);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    console.log('Verifying OTP:', otp);
    // Proceed with OTP verification
  };

  return (
    <div className="body h-100 bg-grey">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xl-12 mt-3">
            <div className="card" style={{ borderRadius: '30px' }}>
              <div className="card-body p-0">
                <div className="row m-0">
                  {/* Left Side */}
                  <div className="col-xl-7 col-md-6 sign text-center bg-purple hide-login">
                    <div>
                      <div className="text-center brand-logo">
                        <a>
                          <img
                            width="200"
                            src="/logo.png"
                            alt="Logo"
                          />
                        </a>
                      </div>
                      <div className="help-support text-white mt-4">
                        <p>Having Troubles? Get Help</p>
                        <p>+27 891 5608348 | support@mujos.co.za</p>
                        <p>
                          <strong>Powered by</strong> | MuJoS Solutions (Pty) Ltd.
                        </p>
                        <p>
                          <strong>Company Reg no</strong> | 2022/403103/07
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="col-xl-5 col-md-6">
                    <div className="sign-in-your p-4">
                      <div className="login-form">
                        <h4 className="p-heading">Hello Again!</h4>
                        <span>To keep connected with us please login with your personal info.</span>

                        {!showOtp ? (
                          <form onSubmit={handleLoginSubmit}>
                            <div className="mb-3">
                              <div className="icon-label">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Username"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              {isSubmitted && !email && (
                                <span className="text-danger validation-error">
                                  Please enter email address
                                </span>
                              )}
                            </div>

                            <div className="mb-3">
                              <div className="icon-label">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              {isSubmitted && !password && (
                                <span className="text-danger validation-error">
                                  Please enter password
                                </span>
                              )}
                            </div>

                            <div className="mb-3">
                              <div className="g-recaptcha" id="html_element"></div>
                            </div>

                            <div className="text-center">
                              <button type="submit" className="btn btn-purple btn-radius btn-block">
                                Sign In
                              </button>
                              <a href="/forgot-password" className="forgot-pass">
                                Forgot Password?
                              </a>
                            </div>
                          </form>
                        ) : (
                          <form onSubmit={handleOtpSubmit}>
                            <div className="mb-3">
                              <div className="icon-label">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                />
                              </div>
                              {isSubmitted && !otp && (
                                <span className="text-danger validation-error">
                                  Please enter OTP
                                </span>
                              )}
                            </div>

                            <div className="text-center">
                              <button type="submit" className="btn btn-purple btn-radius btn-block">
                                Verify OTP
                              </button>
                              <p style={{ marginTop: '10px' }}>Not received your OTP code?</p>
                              <button className="btn btn-grey btn-block btn-radius resendBtn" disabled>
                                Resend OTP
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End Right Side */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
