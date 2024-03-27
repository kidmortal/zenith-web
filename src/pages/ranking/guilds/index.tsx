import styles from "./style.module.scss";
import ForEach from "@/components/ForEach";

type Props = {
  guilds?: Guild[];
};

export function GuildRankingPage(props: Props) {
  return (
    <div className={styles.container}>
      <ForEach
        items={props.guilds}
        render={(guild) => <GuildInfoBox guild={guild} />}
      />
    </div>
  );
}

function GuildInfoBox({ guild }: { guild: Guild }) {
  const owner = guild.members.find((m) => m.role === "owner");
  const memberCount = guild.members.length;
  return (
    <div className={styles.guildBoxContainer}>
      <img width={80} height={80} src={guild.imageUrl} />
      <div className={styles.guildInfoColumn}>
        <h2>{guild.name}</h2>
        <span>Level {guild.level}</span>
        <span>owner: {owner?.user.name}</span>
        <span>Members {memberCount}/10</span>
      </div>
    </div>
  );
}
