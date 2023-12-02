'use client';
import { useState, useEffect } from "react";
import Opinion from "./Opinion";

interface Opinion {
  id: number;
  username: string;
  opinion: string;
  sentiment: string;
  tags: string[];
  date: number;
}
interface Params {
  opinions: Opinion[];
}

export default function CategorizedOpinions( { opinions }: Params) {
  const [food, setFood] = useState(false);
  const [interior, setInterior] = useState(false);
  const [atmosphere, setAtmosphere] = useState(false);
  const [service, setService] = useState(false);
  const [cost, setCost] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleFoodCheckbox = () => {
    setFood(!food);
  };
  const handleInteriorCheckbox = () => {
    setInterior(!interior);
  };
  const handleAtmosphereCheckbox = () => {
    setAtmosphere(!atmosphere);
  };
  const handleServiceCheckbox = () => {
    setService(!service);
  };
  const handleCostCheckbox = () => {
    setCost(!cost);
  };
  const handleMenuCheckbox = () => {
    setMenu(!menu);
  };
  const foodLabel = food ?
    (<div className="py-2 px-4 rounded-full bg-zinc-700 cursor-pointer select-none" onClick={handleFoodCheckbox}>Food</div>) :
    (<div className="py-2 px-4 rounded-full bg-zinc-900 cursor-pointer select-none" onClick={handleFoodCheckbox}>Food</div>);
  const interiorLabel = interior ?
    (<div className="py-2 px-4 rounded-full bg-zinc-700 cursor-pointer select-none" onClick={handleInteriorCheckbox}>Interior</div>) :
    (<div className="py-2 px-4 rounded-full bg-zinc-900 cursor-pointer select-none" onClick={handleInteriorCheckbox}>Interior</div>);
  const atmosphereLabel = atmosphere ?
    (<div className="py-2 px-4 rounded-full bg-zinc-700 cursor-pointer select-none" onClick={handleAtmosphereCheckbox}>Atmosphere</div>) :
    (<div className="py-2 px-4 rounded-full bg-zinc-900 cursor-pointer select-none" onClick={handleAtmosphereCheckbox}>Atmosphere</div>);
  const serviceLabel = service ?
    (<div className="py-2 px-4 rounded-full bg-zinc-700 cursor-pointer select-none" onClick={handleServiceCheckbox}>Service</div>) :
    (<div className="py-2 px-4 rounded-full bg-zinc-900 cursor-pointer select-none" onClick={handleServiceCheckbox}>Service</div>);
  const costLabel = cost ?
    (<div className="py-2 px-4 rounded-full bg-zinc-700 cursor-pointer select-none" onClick={handleCostCheckbox}>Cost</div>) :
    (<div className="py-2 px-4 rounded-full bg-zinc-900 cursor-pointer select-none" onClick={handleCostCheckbox}>Cost</div>);
  const menuLabel = menu ?
    (<div className="py-2 px-4 rounded-full bg-zinc-700 cursor-pointer select-none" onClick={handleMenuCheckbox}>Menu</div>) :
    (<div className="py-2 px-4 rounded-full bg-zinc-900 cursor-pointer select-none" onClick={handleMenuCheckbox}>Menu</div>);

  const [filteredOpinions, setFilteredOpinions] = useState(opinions);
  const [negativeOpinionsCount, setNegativeOpinionsCount] = useState(0);
  const [positiveOpinionsCount, setPositiveOpinionsCount] = useState(0);
  const opinionReducer = (acc: Opinion[], opinion: Opinion) => {
    if (!acc.includes(opinion)) {
      acc.push(opinion);
    }
    return acc;
  };

  useEffect(() => {
    if (!food && !interior && !atmosphere && !service && !cost && !menu) {
      setFilteredOpinions(opinions);
    } else {
      let newOpinions: Opinion[] = [];
      if (food) {
        const foodOpinions = opinions.filter((opinion) => opinion.tags.includes("FOOD"));
        newOpinions = foodOpinions.reduce(opinionReducer, newOpinions);
      }
      if (interior) {
        const interiorOpinions = opinions.filter((opinion) => opinion.tags.includes("INTERIOR"));
        newOpinions = interiorOpinions.reduce(opinionReducer, newOpinions);
      }
      if (atmosphere) {
        const atmosphereOpinions = opinions.filter((opinion) => opinion.tags.includes("ATMOSPHERE"));
        newOpinions = atmosphereOpinions.reduce(opinionReducer, newOpinions);
      }
      if (service) {
        const serviceOpinions = opinions.filter((opinion) => opinion.tags.includes("SERVICE"));
        newOpinions = serviceOpinions.reduce(opinionReducer, newOpinions);
      }
      if (cost) {
        const costOpinions = opinions.filter((opinion) => opinion.tags.includes("COST"));
        newOpinions = costOpinions.reduce(opinionReducer, newOpinions);
      }
      if (menu) {
        const menuOpinions = opinions.filter((opinion) => opinion.tags.includes("MENU"));
        newOpinions = menuOpinions.reduce(opinionReducer, newOpinions);
      }
      newOpinions.sort((a, b) => b.date - a.date);
      
      setFilteredOpinions(newOpinions);
    }
  }, [food, interior, atmosphere, service, cost, menu]);

  useEffect(() => {
    const negativeOpinionsCount = filteredOpinions.reduce((acc, opinion) => {
      if (opinion.sentiment === "negative") {
        acc++;
      }
      return acc;
    }, 0);
    const positiveOpinionsCount = filteredOpinions.length - negativeOpinionsCount;
    setNegativeOpinionsCount(negativeOpinionsCount);
    setPositiveOpinionsCount(positiveOpinionsCount);
  }, [filteredOpinions]);
  

  return (
    <div>
      <div>
        <div className="flex items-center justify-center gap-4">
          <div className="py-2 px-4 rounded-full bg-red-700">{negativeOpinionsCount} negative</div>
          <div className="py-2 px-4 rounded-full bg-green-700">{positiveOpinionsCount} positive</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        {foodLabel}
        {interiorLabel}
        {atmosphereLabel}
        {serviceLabel}
        {costLabel}
        {menuLabel}
      </div>
      <ul>
        {filteredOpinions.map((comment: Opinion) => (
          <li key={comment.id} className="m-4">
            <Opinion username={comment.username} opinion={comment.opinion} sentiment={comment.sentiment} tags={comment.tags} date={comment.date}/>
          </li>
        ))}
      </ul>
    </div>
  )
}