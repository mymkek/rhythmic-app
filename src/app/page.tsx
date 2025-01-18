import {Balls, BarRoll, Metronome, SettingsForm} from "@/features/metronome";


export default function Home() {

    console.log(Metronome);
  return (
    <div>
        <Metronome>
            <Balls/>
            <BarRoll/>
            <SettingsForm/>
        </Metronome>
    </div>
  );
}
