import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";
const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button variant={"destructive"} size={"lg"}>
        Hello World
      </Button>
      <ModeToggle />
    </div>
  );
};

export default App;
