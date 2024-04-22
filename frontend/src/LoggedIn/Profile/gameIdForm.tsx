import React from 'react';

interface GameIdFormProps {
  steamId: string;
  riotId: string;
  setSteamId: (steamId: string) => void;
  setRiotId: (riotId: string) => void;
  saveSteamId: () => Promise<void>;
  saveRiotId: () => Promise<void>;
}

const GameIdForm = ({
  steamId,
  riotId,
  setSteamId,
  setRiotId,
  saveSteamId,
  saveRiotId
}: GameIdFormProps) => {
  return (
    <div className="d-flex flex-column">
      <form onSubmit={saveSteamId}>
        <label htmlFor="steamId" className="form-label">
          Steam ID
        </label>
        <input
          className="form-control"
          type="text"
          id="steamId"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
        ></input>
      </form>
      <form onSubmit={saveRiotId}>
        <label htmlFor="riotId" className="form-label">
          Summoner Name
        </label>
        <input
          className="form-control"
          type="text"
          id="riotId"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default GameIdForm;
