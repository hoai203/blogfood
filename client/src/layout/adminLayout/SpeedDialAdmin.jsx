import React from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  ArchiveBoxXMarkIcon,
  ArrowUpTrayIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../ADMIN/routes";
const SpeedDialAdmin = ({
  handleUpdateStatus = () => { },
  handleEdit = () => { },
  detail = {},
  idEntity = "",
}) => {
  const { infoAdmin } = useSelector((state) => state.admin);
  return (
    <div className="py-5 absolute right-0 pr-5 bottom-0">
      <div className="flex gap-5 items-center">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton
              size="lg"
              className="rounded-full border-white border"
            >
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            {detail?._id !== infoAdmin?._id && (
              <div className="flex flex-col gap-y-1 p-1 items-center justify-center">
                <SpeedDialAction
                  onClick={() => handleUpdateStatus("destroy")}
                  className={`bg-red-500 text-white ${detail?.status === "destroy" ? "hidden" : ""
                    }`}
                >
                  <ArchiveBoxXMarkIcon {...icon} />
                </SpeedDialAction>
                <SpeedDialAction
                  onClick={() => handleUpdateStatus("approved")}
                  className={`bg-green-500 text-white
                                        ${detail?.status === "approved"
                      ? "hidden"
                      : ""
                    }`}
                >
                  <ArrowUpTrayIcon {...icon} />
                </SpeedDialAction>
              </div>
            )}
            {idEntity ? idEntity === infoAdmin?._id && (
              <SpeedDialAction
                className="bg-primary text-white"
                onClick={handleEdit}
              >
                <PencilSquareIcon {...icon} />
              </SpeedDialAction>
            ) : <SpeedDialAction
              className="bg-primary text-white"
              onClick={handleEdit}
            >
              <PencilSquareIcon {...icon} />
            </SpeedDialAction>}
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
};

export default SpeedDialAdmin;
