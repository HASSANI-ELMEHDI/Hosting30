import React, { createContext, useState, useContext } from 'react';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface ContextType {
Type:string;
setType: (Type: string) => void;
Start:Date;
setStart: (Start: Date) => void;
End:Date;
setEnd: (End: Date) => void;
Numberppl:number;
setNumberppl: (Numberppl: number) => void;
Description:string;
setDescription: (Description: string) => void;
Rules:string;
setRules: (Rules: string) => void;
Access:string;
setAccess: (Access: string) => void;
Price:number
setPrice: (Price: number) => void;
Coordina:Coordinate|null
setCoordina:(Coordina:Coordinate|null)=>void;
myImages:string[]
setMyImages:(myImages:string[])=>void
done:boolean
setDone:(done:boolean)=>void
}

const Context = createContext<ContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}


export const ContProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [Type,setType]=useState("Rooms");
  const [Start,setStart]=useState(new Date());
  const [End,setEnd]=useState(new Date());
  const [Numberppl,setNumberppl]=useState(1);
  const [Description,setDescription]=useState('');
  const [Rules,setRules]=useState('');
  const [Access,setAccess]=useState('');
  const [Price,setPrice]=useState(0);
  const [Coordina,setCoordina]=useState<Coordinate|null>(null)
  const [myImages,setMyImages]=useState([""])
  const [done,setDone]=useState(false)

  const ContextValue: ContextType = {
    Type,setType,
    Start,setStart,
    End,setEnd,
    Numberppl,setNumberppl,
    Description,setDescription,
    Rules,setRules,
    Access,setAccess,
    Price,setPrice,
    Coordina,setCoordina,
    myImages,setMyImages,
    done,setDone
  };

  return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
};

export const usePro = (): ContextType => {
  const myContext = useContext(Context);
  if (!myContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return myContext;
};