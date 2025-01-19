import {Balls, BarRoll, Metronome, SettingsForm} from "@/features/metronome";


export default function Home() {

  return (
      <div className="container mx-auto">
          <Metronome>
              <Balls/>
              <BarRoll/>
              <SettingsForm/>
          </Metronome>
      </div>
  );
}
