import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useMuteState } from "./MuteContext";

export const MuteButton = () => {
  const { isMuted, toggleMute } = useMuteState();
  return (
    <div className="hidden md:inline-flex z-10 fixed mt-4 md:bottom-4 right-4 flex items-center gap-2">
      <div className="text-yellow text-sm">
        {!isMuted ? (
          <FaVolumeUp className="h-6 w-6" />
        ) : (
          <FaVolumeMute className="h-6 w-6" />
        )}
      </div>
      <label className="relative inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          value="audio"
          className="sr-only peer"
          checked={!isMuted}
          onChange={toggleMute}
        />
        <div
          className={`w-11 h-6 ${isMuted ? "bg-gray" : "bg-yellow"} rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow`}
        ></div>
      </label>
    </div>
  );
};
export default MuteButton;
