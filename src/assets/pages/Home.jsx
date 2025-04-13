import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Home = () => {
  const navigate = useNavigate(); // hook from react-router

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] flex items-center justify-center font-[Inter]">
      <section className="flex flex-col items-center w-[90%] md:w-[627px] text-center">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-400 h-[48px] w-[48px]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13.71-.71a.996.996 0 011.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71-2.12-2.12zm-.71.71l-5.3 5.3V21h2.12l5.3-5.3-2.12-2.12z" />
        </svg>

        {/* Heading */}
        <h3 className="mt-[20px] mb-[8px] text-[24px] font-semibold text-black">
          Sentence Construction
        </h3>

        {/* Subheading */}
        <p className="text-[14px] text-neutral-500 leading-[20px] max-w-[480px]">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        {/* Stats Row */}
        <div className="mt-[48px] flex w-full justify-around text-center">
          {/* Time Per Question */}
          <div className="flex flex-col items-center w-[182px]">
            <h6 className="text-[14px] font-semibold text-black mb-[8px]">
              Time Per Question
            </h6>
            <p className="text-[12px] text-neutral-500">30 sec</p>
          </div>
          <div className="w-[1px] bg-neutral-200 h-[48px]" />
          {/* Total Questions */}
          <div className="flex flex-col items-center w-[182px]">
            <h6 className="text-[14px] font-semibold text-black mb-[8px]">
              Total Questions
            </h6>
            <p className="text-[12px] text-neutral-500">10</p>
          </div>
          <div className="w-[1px] bg-neutral-200 h-[48px]" />
          {/* Coins */}
          <div className="flex flex-col items-center w-[182px]">
            <h6 className="text-[14px] font-semibold text-black mb-[8px]">
              Coins
            </h6>
            <p className="text-[12px] text-neutral-500 flex items-center gap-[6px]">
              <span className="h-[10px] w-[10px] rounded-full bg-[#FFD700]" />
              0
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-[40px] flex gap-[16px]">
          <button className="h-[36px] w-[120px] rounded-[6px] border border-[#453fe1] text-[#453fe1] hover:bg-[#eef2ff] text-[14px] font-medium transition">
            Back
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="h-[36px] w-[120px] rounded-[6px] bg-[#453fe1] text-white text-[14px] font-medium hover:bg-[#3c3ac2] transition"
          >
            Start
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
