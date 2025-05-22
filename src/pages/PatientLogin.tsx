import React, { useState } from "react";
import { CenteredLayout } from "../components/CenteredLayout";
import { COLORS } from "../constants/theme";
import { PrimaryButton } from "../components/PrimaryButton";
import logo from "../assets/logo.png";

const PatientLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
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

    console.log("Verifying OTP:", otp);
    // Proceed with OTP verification
  };

  return (
    <CenteredLayout>
      <div className="bg-gray-100 h-full">
        <div className="container mx-auto h-full flex items-center justify-center">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg">
            <div className="flex h-full">
              {/* Left Side: Image */}
              <div
                style={{
                  background: COLORS.gradientPrimary,
                }}
                className="w-full md:w-1/2 text-white text-center p-8 rounded-l-2xl"
              >
                <div>
                  <div className="mb-8">
                    <img width="200" src={logo} alt="Logo" />
                  </div>
                  <div className="mt-4">
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

              {/* Right Side: Login Form */}
              <div className="w-full md:w-1/2 p-8">
                <h4 className="text-2xl font-semibold mb-2">Hello Again!</h4>
                <p className="mb-6">
                  To keep connected with us please login with your personal
                  info.
                </p>

                {!showOtp ? (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {isSubmitted && !email && (
                        <span className="text-red-500 text-sm">
                          Please enter email address
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {isSubmitted && !password && (
                        <span className="text-red-500 text-sm">
                          Please enter password
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="g-recaptcha" id="html_element"></div>
                    </div>

                    <div className="text-center">
                      <PrimaryButton htmlType="submit">Sign In</PrimaryButton>
                      <a
                        href="/forgot-password"
                        className="text-blue-500 text-sm mt-2 block text-center"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      {isSubmitted && !otp && (
                        <span className="text-red-500 text-sm">
                          Please enter OTP
                        </span>
                      )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Verify OTP
                      </button>
                      <p className="mt-4">Not received your OTP code?</p>
                      <button
                        className="w-full py-3 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Resend OTP
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CenteredLayout>
  );
};

export default PatientLogin;
