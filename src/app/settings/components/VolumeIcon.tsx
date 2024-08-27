import {
  ImVolumeHigh,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
} from "react-icons/im";

function VolumeIcon({
  volume,
  setVolume,
  size,
}: {
  volume: number;
  setVolume: Function;
  size: number;
}) {
  return (
    <div onClick={() => setVolume((v: number) => (v > 0 ? 0 : 1))}>
      {volume > 0.66 ? (
        <ImVolumeHigh size={size} />
      ) : volume > 0.33 ? (
        <ImVolumeMedium size={size} />
      ) : volume > 0 ? (
        <ImVolumeLow size={size} />
      ) : (
        <ImVolumeMute2 size={size} />
      )}
    </div>
  );
}

export default VolumeIcon;
