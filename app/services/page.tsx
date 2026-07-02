"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import LoginForm from "@/components/login-form";
import EmployeeRegistration from "@/components/employee-registeration";
import ScheduleAssessment from "@/components/schedule-assessment";
import EmployerRegistration from "@/components/employer-registeration";
import EmployerProfile from "@/components/employer-profile";
import EmployerAssessmentRequest from "@/components/employer-assessment-request";
import EmployerCandidateList from "@/components/employer-candidate-list";
import SuccessMessage from "@/components/success-message";

export default function ServicesPage() {
  const router = useRouter();
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"employer" | "employee" | null>(
    null
  );

  // Registration success states
  const [employeeRegistrationSuccess, setEmployeeRegistrationSuccess] =
    useState(false);
  const [employerRegistrationSuccess, setEmployerRegistrationSuccess] =
    useState(false);
  const [assessmentRequestSuccess, setAssessmentRequestSuccess] =
    useState(false);
  const [scheduleAssessmentSuccess, setScheduleAssessmentSuccess] =
    useState(false);

  // Screen states
  const [employeeScreen, setEmployeeScreen] = useState<
    "registration" | "assessment"
  >("registration");
  const [employerScreen, setEmployerScreen] = useState<
    "registration" | "profile" | "assessment" | "candidates"
  >("registration");

  // Form key
  const [formKey, setFormKey] = useState(0);

  // Handle login
  const handleLogin = (type: "employer" | "employee") => {
    setIsLoggedIn(true);
    setUserType(type);

    // Set initial screen based on user type
    if (type === "employer") {
      // In a real app, check if user has completed registration
      // For demo, we'll assume new users need to register
      setEmployerScreen("registration");
    } else {
      setEmployeeScreen("registration");
    }
  };

  // Handle employee registration completion
  const handleEmployeeRegistrationComplete = () => {
    setEmployeeRegistrationSuccess(true);
  };

  // Handle employer registration completion
  const handleEmployerRegistrationComplete = () => {
    setEmployerRegistrationSuccess(true);
  };

  // Handle assessment request submission
  const handleAssessmentRequestSuccess = () => {
    setAssessmentRequestSuccess(true);
  };

  // Handle schedule assessment submission
  const handleScheduleAssessmentSuccess = () => {
    setScheduleAssessmentSuccess(true);
  };

  // Continue after employee registration success
  const continueToEmployeeAssessment = () => {
    setEmployeeRegistrationSuccess(false);
    setEmployeeScreen("assessment");
  };

  // Continue after employer registration success
  const continueToEmployerProfile = () => {
    setEmployerRegistrationSuccess(false);
    setEmployerScreen("profile");
  };

  const continueToCandidateList = () => {
    setAssessmentRequestSuccess(false);
    setEmployerScreen("candidates");
  };

  const handleScheduleAnother = () => {
    setScheduleAssessmentSuccess(false);
    setFormKey((prevKey) => prevKey + 1);
  };

  const handleCloseAndRedirect = () => {
    setScheduleAssessmentSuccess(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#050e2d] relative overflow-x-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/servicespage/services-bg.png"
          alt="Background"
          fill
          priority
          className="object-cover opacity-100"
        />
      </div>

      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {!isLoggedIn ? (
            // Login Form
            <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 backdrop-blur-sm max-w-md mx-auto">
              <LoginForm onLogin={handleLogin} />
            </div>
          ) : (
            // Logged in content
            <>
              {/* Back button - only shown on assessment screen */}
              {userType === "employee" && employeeScreen === "assessment" && (
                <button
                  onClick={() => setEmployeeScreen("registration")}
                  className="text-white mb-4"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}

              {/* Content Panel */}
              {userType === "employee" ? (
                <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 backdrop-blur-sm">
                  {employeeRegistrationSuccess ? (
                    <SuccessMessage
                      title="Registration Successful!"
                      message="Your employee account has been created successfully. You can now proceed to schedule your assessment."
                      buttonText="Continue to Assessment"
                      onContinue={continueToEmployeeAssessment}
                    />
                  ) : employeeScreen === "registration" ? (
                    <EmployeeRegistration
                      onNext={handleEmployeeRegistrationComplete}
                    />
                  ) : (
                    <>
                      <ScheduleAssessment
                        key={formKey}
                        onSubmit={handleScheduleAssessmentSuccess}
                      />
                      {scheduleAssessmentSuccess && (
                        <div
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                          onClick={handleCloseAndRedirect}
                        >
                          <div
                            className="relative bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 backdrop-blur-sm max-w-md mx-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={handleCloseAndRedirect}
                              className="absolute top-4 right-4 text-white hover:text-gray-300"
                            >
                              <X className="w-6 h-6" />
                            </button>
                            <SuccessMessage
                              title="Assessment Scheduled!"
                              message="Your assessment has been successfully scheduled. Please check your email for details."
                              buttonText="Schedule Another"
                              onContinue={handleScheduleAnother}
                            />
                            <div className="mt-4 text-center">
                              <button
                                onClick={handleCloseAndRedirect}
                                className="text-white hover:underline"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <>
                  {/* Employer Screens */}
                  {employerRegistrationSuccess ? (
                    <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 backdrop-blur-sm">
                      <SuccessMessage
                        title="Registration Successful!"
                        message="Your employer account has been created successfully. You can now access all employer features."
                        buttonText="Continue to Profile"
                        onContinue={continueToEmployerProfile}
                      />
                    </div>
                  ) : employerScreen === "registration" ? (
                    <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 backdrop-blur-sm">
                      <EmployerRegistration
                        onSubmit={handleEmployerRegistrationComplete}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Employer Navigation Tabs */}
                      <div className="bg-[#b8bdc7] rounded-lg mb-4">
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            onClick={() => setEmployerScreen("profile")}
                            className={`py-3 px-4 text-center font-medium transition-colors duration-200 ${
                              employerScreen === "profile"
                                ? "bg-[#2d5184] rounded-lg text-white"
                                : "text-[#212121] hover:text-[#00418d]"
                            }`}
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => setEmployerScreen("assessment")}
                            className={`py-3 px-4 text-center font-medium transition-colors duration-200 ${
                              employerScreen === "assessment"
                                ? "bg-[#2d5184] rounded-lg text-white"
                                : "text-[#212121] hover:text-[#00418d]"
                            }`}
                          >
                            Assessment Request
                          </button>
                          <button
                            onClick={() => setEmployerScreen("candidates")}
                            className={`py-3 px-4 text-center font-medium transition-colors duration-200 ${
                              employerScreen === "candidates"
                                ? "bg-[#2d5184] rounded-lg text-white"
                                : "text-[#212121] hover:text-[#00418d]"
                            }`}
                          >
                            Candidate List
                          </button>
                        </div>
                      </div>

                      {/* Employer Content */}
                      <div className="bg-gradient-to-r from-[#3a4a7b]/90 to-[#9ba3b9]/90 rounded-lg p-8 backdrop-blur-sm">
                        {assessmentRequestSuccess ? (
                          <SuccessMessage
                            title="Assessment Request Submitted!"
                            message="Your assessment request has been successfully submitted. You will be notified once the assessment is complete."
                            buttonText="View Candidate List"
                            onContinue={continueToCandidateList}
                          />
                        ) : (
                          <>
                            {employerScreen === "profile" && <EmployerProfile />}
                            {employerScreen === "assessment" && (
                              <EmployerAssessmentRequest
                                onSubmit={handleAssessmentRequestSuccess}
                              />
                            )}
                            {employerScreen === "candidates" && (
                              <EmployerCandidateList />
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
