import { useResendOTP } from "@/hooks/queries/useAuth";
import { useEffect, useRef, useState } from "react";

interface OTPResendPropType {
  email?: string
}

const OTPResend = ({email}:OTPResendPropType) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const creationTimeRef = useRef(localStorage.getItem("otp-time"));
  const resendOTP = useResendOTP();

  const getRemainingTime = (creationTime: string) => {
    const futureTime = new Date(creationTime).getTime() + 60000;
    const timeRemaining = Date.parse(`${new Date(futureTime)}`) - Date.now();

    setMinutes(Math.floor(timeRemaining / 1000 / 60) % 60);
    setSeconds(Math.floor(timeRemaining / 1000) % 60);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (creationTimeRef && creationTimeRef.current) {
      interval = setInterval(() => {
        if (creationTimeRef.current) {
          getRemainingTime(creationTimeRef.current);
        }
      });
    }

    const updateCreationTime = () => {
        creationTimeRef.current = localStorage.getItem("otp-time");
    }

    window.addEventListener("storage", updateCreationTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateCreationTime);
    };
  }, [creationTimeRef]);

  const resendOtpHandler = () => {
    console.log("check");
    if(email){
        resendOTP.mutate({
            email
        })
    }
  };
  console.log(minutes, seconds);
  return (
    <span>
      {creationTimeRef && seconds >= 0 && minutes >= 0 ? (
        <span>
          {minutes}:{seconds}
        </span>
      ) : (
        <button
          type="button"
          onClick={resendOtpHandler}
          className="text-[#AB97FF]"
        >
          Resend
        </button>
      )}
    </span>
  );
};

export default OTPResend;
