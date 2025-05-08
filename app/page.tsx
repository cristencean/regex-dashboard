import Sidebar from "@/components/Sidebar";
import TextArea from "@/components/TextArea";

const Home = () => {
  return (
    <div>
      <main>
        <div>
          <div>
            Sidebar
            <Sidebar />
          </div>

          <div>
            Middle section
            <TextArea />
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default Home;