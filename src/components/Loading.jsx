import Loader from "./Loader";

const Loading = () => {
  return (
    <div className="w-full h-[50%] top-0 left-0 bg-[rgba(255,255,255,0.8)] z-[55] flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
