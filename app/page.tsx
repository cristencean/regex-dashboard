import Sidebar from "@/components/Sidebar";
import TextArea from "@/components/TextArea";
import StateInitializer from "@/components/StateInitializer";

const Home = () => {

  return (
    <div className="max-w-7xl px-4 py-8 m-auto">
      <StateInitializer />
      <main className='flex flex-col md:flex-row'>
          <div className="w-full md:w-1/3 pr-8">
            <Sidebar />
          </div>

          <div className="w-full md:w-2/3 mt-8 md:mt-4">
            <TextArea />
          </div>
      </main>
    </div>
  );
}

export default Home;