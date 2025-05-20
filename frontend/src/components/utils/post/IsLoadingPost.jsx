import Nav from "../../Nav";

function IsLoadingPost() {
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-lg animate-pulse">
          <div className="h-64 bg-[#121212] rounded-lg mb-6"></div>
          <div className="h-8 bg-[#121212] rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-[#121212] rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-[#121212] rounded mb-6"></div>
        </div>
      </div>
    </>
  );
}

export default IsLoadingPost;
