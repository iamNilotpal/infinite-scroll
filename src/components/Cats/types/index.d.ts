export type CatType = {
  id: string;
  name: string;
  origin: string;
  image: {
    width: number;
    height: number;
    id: string;
    url: string;
  };
  description: string;
  life_span: string;
  temperament: string;
  adaptability: number;
  child_friendly: number;
  stranger_friendly: number;
  wikipedia_url: string;
};
