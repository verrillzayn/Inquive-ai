import Loader from "@/components/loader";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
