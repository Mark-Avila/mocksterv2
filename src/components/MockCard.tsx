import { FaTrash } from "react-icons/fa";
import { limitString } from "../utils";
import { useState } from "react";
import { mockService, resultService } from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import { useNavigate } from "react-router-dom";

interface MockGridItemProps {
  label: string;
  value: string;
}

function MockGridItem({ label, value }: MockGridItemProps) {
  return (
    <p className="mb-2 font-sans text-sm text-slate-500">
      <span className="font-bold">{label}</span> {value}
    </p>
  );
}

interface Props {
  id: string;
  curr_user_id: string;
  showRecent?: boolean;
  creator_id: string;
  title: string;
  creator: string;
  created: string;
  items: string;
  subject: string;
  onStart: (e: unknown) => void;
  handleLoading: (isLoading: boolean) => void;
}

function MockCard({
  id,
  curr_user_id,
  creator_id,
  showRecent,
  title,
  creator,
  created,
  items,
  subject,
  onStart,
  handleLoading,
}: Props) {
  const { data } = useSelector((state: RootState) => state.auth);
  const [willDelete, setWillDelete] = useState(false);
  const navigate = useNavigate();

  const onMockDelete = async () => {
    handleLoading(true);

    if (data) {
      try {
        await resultService.deleteResultsByMockId(id, data);
        await mockService.deleteMock(id, data);
        navigate(0);
      } catch (err: unknown) {
        throw Error((err as Error).message);
      }
    }
  };

  return (
    <li className="flex list-none flex-col rounded-lg border-l-4 border-red-400 bg-white shadow-md">
      <div className="p-4">
        {showRecent && (
          <p className="font-sans text-sm font-bold text-slate-400">
            Based on your recent activities
          </p>
        )}
        <h1 className="my-2 font-inter font-bold text-red-400">{title}</h1>
        <div className="mt-4 flex flex-col xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-y-2">
          <MockGridItem label="Creator" value={limitString(creator, 15)} />
          <MockGridItem label="Date Created" value={created} />
          <MockGridItem label="Subject" value={subject} />
          <MockGridItem label="Items" value={items} />
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t-2 border-slate-300 p-4">
        <button
          onClick={onStart}
          className="font-inter font-bold text-red-400 transition ease-in-out hover:text-cyan-400"
        >
          Start
        </button>
        {curr_user_id === creator_id ? (
          willDelete ? (
            <div className="flex w-full items-center justify-end">
              <p className="mr-4 text-xs text-red-400">Are you sure?</p>
              <button
                onClick={onMockDelete}
                className="mr-4 font-bold text-red-400 hover:text-red-500"
              >
                Yes
              </button>
              <button
                onClick={() => setWillDelete(false)}
                className="font-bold text-slate-400 hover:text-cyan-500"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setWillDelete(true)}
              className="text-red-200 hover:text-red-400"
            >
              <FaTrash />
            </button>
          )
        ) : (
          <></>
        )}
      </div>
    </li>
  );
}

export default MockCard;
