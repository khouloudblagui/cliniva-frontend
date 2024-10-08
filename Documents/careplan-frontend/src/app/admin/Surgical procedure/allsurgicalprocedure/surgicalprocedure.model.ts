
export class surgicalprocedure {
  cptky: number;
  cptDesc: string;
  cptCode: string ;
  cptCategory:string;

  constructor(surgicalprocedure: surgicalprocedure) {
    {
      this.cptky = surgicalprocedure.cptky ;
      this.cptCode = surgicalprocedure.cptCode;
      this.cptDesc = surgicalprocedure.cptDesc;
      this.cptCategory = surgicalprocedure.cptCategory;
    }
  }

}
