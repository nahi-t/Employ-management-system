import React from "react";
import Summurycard from "./Summurycard";
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

function Adminsummery() {
  return (
    <div className="p-6  ">
      <h3 className="text-2xl font-bold ">Dashboard overviwe</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-gradient-to-br from-white to-gray-400  ">
        <Summurycard
          icon={<FaUser />}
          text={"total employe"}
          number={13}
          color="bg-teal-600"
        />
        <Summurycard
          icon={<FaUser />}
          text={"total Departemant"}
          number={5}
          color="bg-yellow-600"
        />
        <Summurycard
          icon={<FaMoneyBillWave />}
          text={"total Salary"}
          number={5}
          color="bg-yellow-600"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-6 ">
          <Summurycard
            icon={<FaFileAlt />}
            text={" Leave Applied"}
            number={5}
            color="bg-yellow-600"
          />
          <Summurycard
            icon={<FaCheckCircle />}
            text={" Leave Approved"}
            number={5}
            color="bg-green-600"
          />
          <Summurycard
            icon={<FaHourglassHalf />}
            text={" Leave Pending"}
            number={5}
            color="bg-yellow-600"
          />
          <Summurycard
            icon={<FaTimesCircle />}
            text={" Leave Rejected"}
            number={5}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}

export default Adminsummery;
