"use client";
import Image from "next/image";
import { LinearProgress } from "@mui/material";

function Loading() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-white z-50 flex items-center justify-center ">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/logo.jpg"
          alt="Logo"
          width={170}
          height={170}
          loading="eager"
        ></Image>
        <h1 className="text-6xl font-bold mb-10">
          <span className="text-amber-400">Busy</span> Bee
        </h1>
        <LinearProgress
          sx={{
            width: 265,
            height: 10,
            bgcolor: "#F4AF01",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Loading;
