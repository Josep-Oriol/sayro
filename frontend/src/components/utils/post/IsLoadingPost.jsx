import Nav from "../../Nav";

function IsLoadingPost() {
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-dark-surface p-8 rounded-lg shadow-lg animate-pulse">
          <div className="h-64 bg-dark-background rounded-lg mb-6"></div>
          <div className="h-8 bg-dark-background rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-dark-background rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-dark-background rounded mb-6"></div>
        </div>
      </div>
    </>
  );
}

export default IsLoadingPost;
