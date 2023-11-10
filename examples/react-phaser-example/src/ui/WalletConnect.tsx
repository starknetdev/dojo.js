import { useDojo } from "../hooks/useDojo";
import { RPSSprites } from "../phaser/config/constants";
import { ClickWrapper } from "./ClickWrapper";

export const WalletConnect = () => {
    const {
        account: { account, create, isDeploying, select, list, clear },
        systemCalls: { spawn },
        networkLayer,
    } = useDojo();

    return (
        <ClickWrapper>
            <div className="flex space-x-3 justify-between bg-gray-800">
                <div className="flex flex-col">
                    <button
                        onClick={create}
                        className="border-2 border-red-500 p-1"
                    >
                        {isDeploying ? "deploying burner" : "create burner"}
                    </button>
                    <button onClick={clear} className=" p-1">
                        clear burners
                    </button>
                </div>

                <div className="card text-black">
                    <div className="text-white">signer: </div>
                    <select onChange={(e) => select(e.target.value)}>
                        {list().map((account, index) => {
                            return (
                                <option value={account.address} key={index}>
                                    {account.address}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <button
                        className="border-2 border-red-500 p-1"
                        onClick={() => {
                            networkLayer.sync();
                            spawn({
                                signer: account,
                                rps: RPSSprites.Scissors,
                            });
                        }}
                    >
                        Spawn
                    </button>
                </div>
            </div>
        </ClickWrapper>
    );
};
