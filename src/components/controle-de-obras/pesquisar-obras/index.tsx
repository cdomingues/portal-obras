import { useEffect, useState } from "react";
import SearchBuildingsScreen from "./screen";




const SearchBuildingsController = () => {
  const [file, setFile] = useState<any>();



 

 /*  const getFileOfConstructions = async () => {
    const response = await fetch(
      //"https://dados.mogidascruzes.sp.gov.br/api/3/action/datastore_search?resource_id=03146785-57db-4207-8924-85c492e8b9a8",
      "https://dadosadm.mogidascruzes.sp.gov.br/api/obras/?page=1"
      ,
      {
        headers: {
          "Authorization": "Token 691239ed466fd053651a57ac9c075f0d80c25cdd"
        }
      }
      
    );

    const data = await response.json();
    
    if (!data) {
      return;
    }
    return setFile(data);
  }; */
  const [currentPage, setCurrentPage] = useState(1);
const [hasNextPage, setHasNextPage] = useState(true);
  
const getFileOfConstructions = async () => {
  for (let i = currentPage; i <= currentPage + 2; i++) {
    const response = await fetch(
      `https://dadosadm.mogidascruzes.sp.gov.br/api/obras/?page=${i}`,
      {
        headers: {
          "Authorization": "Token 691239ed466fd053651a57ac9c075f0d80c25cdd"
        }
      }
    );

    const data = await response.json();

    if (!data) {
      return;
    }

    
  
    // Update hasNextPage based on whether 'next' field is null in API response
    setHasNextPage(data.next !== null);
  
    // Update current page
    setCurrentPage(i);
  
    // Append new results to existing file or initialize if it's null
    setFile((prevFile: { results: any; }) => ({
      ...data,
      results: prevFile ? [...prevFile.results, ...data.results] : data.results,
    }));

    if (!hasNextPage) break;
  };
  
}

  const [nameBuilding, setNameBuilding] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [buildingStep, setBuildingStep] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [buildingStatus, setBuildingStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [arrayBuildings, setArrayBuildings] = useState<Array<any>>([]);

  const handleChangeSelectNeighborhood = (event: any) => {
    setNeighborhood(event.target.value as string);
  };

  const handleChangeSelectBuildingStep = (event: any) => {
    setBuildingStep(event.target.value as string);
  };

  const handleChangeSelectBuildingType = (event: any) => {
    setBuildingType(event.target.value as string);
  };

  const handleChangeSelectBuildingStatus = (event: any) => {
    setBuildingStatus(event.target.value as string);
  };

  const handleFilterBuildings = () => {
    let filteredValues = file?.results;
  
    // Verificar se algum filtro está definido
    if (
      nameBuilding ||
      companyName ||
      neighborhood ||
      buildingStep ||
      buildingType ||
      buildingStatus
    ) {
      // Aplicar os filtros apenas se algum deles estiver definido
      filteredValues = filteredValues.filter(
        (item: any) =>
          (!nameBuilding ||
            item?.nome_da_obra
              ?.toLowerCase()
              ?.includes(nameBuilding?.toLowerCase())) &&
          (!companyName ||
            item?.razao_social_contratada
              ?.toLowerCase()
              ?.includes(companyName?.toLowerCase())) &&
          (!neighborhood ||
            item?.bairro?.toLowerCase()?.includes(neighborhood?.toLowerCase())) &&
          (!buildingStep ||
            item?.situacao?.toLowerCase()?.includes(buildingStep?.toLowerCase())) &&
          (!buildingType ||
            item?.categoria
              ?.toLowerCase()
              ?.includes(buildingType?.toLowerCase()))
              &&
          (!buildingStatus ||
            item?.categoria
              ?.toLowerCase()
              ?.includes(buildingStatus?.toLowerCase()))
      );
    }
  
    setPage(0);
    setArrayBuildings(filteredValues);
  };

  const handleClearFilters = () => {
    setNameBuilding("");
    setCompanyName("");
    setNeighborhood("");
    setBuildingStep("");
    setBuildingType("");
    setBuildingStatus("");
    // Chame a função de filtro para redefinir os valores filtrados
    handleFilterBuildings();
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage - 1);
  };

  const numberOfPages = Math.ceil(arrayBuildings?.length / rowsPerPage);

  useEffect(() => {
    getFileOfConstructions();
  }, []);

  useEffect(() => {
    setArrayBuildings(file?.results);
  }, [file]);

  const handlers: any = {
    arrayBuildings,
    nameBuilding,
    setNameBuilding,
    companyName,
    setCompanyName,
    handleChangeSelectNeighborhood,
    neighborhood,
    handleChangeSelectBuildingStep,
    buildingStep,
    handleChangeSelectBuildingType,
    buildingType,
    handleChangeSelectBuildingStatus,
    buildingStatus,
    handleFilterBuildings,
    page,
    rowsPerPage,
    numberOfPages,
    handleChangePage,
    handleClearFilters
  };

  return <SearchBuildingsScreen handlers={handlers} />;
};

export default SearchBuildingsController;