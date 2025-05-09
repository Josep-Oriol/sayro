import Nav from "../components/Nav.jsx";

function CreatePost() {
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <form action="">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 p-2 border rounded w-full"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              className="mt-1 p-2 border rounded w-full"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="mt-1 p-2 border rounded w-full"
              accept="image/*"
            />
          </div>
          <div className="mb-4 flex">
            <label
              htmlFor="published"
              className="text-sm font-medium text-gray-700"
            >
              Published
            </label>
            <input
              type="checkbox"
              id="published"
              name="published"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Post
          </button>
        </form>
      </div>
    </>
  );
}
export default CreatePost;
