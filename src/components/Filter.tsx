import React from "react";
import {ITag} from "../../types/tags";

interface FilterProps {
    tags: ITag[];
    onFilter: (filters: any) => void;
}

export const Filter: React.FC<FilterProps> = ({tags, onFilter}) => {
    const [name, setName] = React.useState<string>("");
    const [tag, setTag] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("");
    const [date, setDate] = React.useState<string>("");
    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
  const handleFilter = () => {
      onFilter({ name, tag, status, date, startDate, endDate });
  }

  const clearFilter = () => {
        setName("");
        setTag("");
        setStatus("");
        setDate("");
        setStartDate("");
        setEndDate("");
        onFilter({ name, tag, status, date, startDate, endDate });
  }

  return (
      <div className="flex gap-5">
          <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Nome ou descrição</span>
              </div>
              <input type="text" placeholder="Digite aqui" value={name} onChange={(e) => setName(e.target.value)}
                     onBlur={handleFilter}
                     className="input input-bordered w-full max-w-xs"/>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Tags</span>
              </div>
              <select className="select select-bordered w-full max-w-xs" value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      onClick={handleFilter}>
                  <option value="">Selecione uma tag</option>
                  {tags.map((tag, index) => (
                      <option key={index} value={tag.id}>{tag.name}</option>
                  ))}
              </select>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Status</span>
              </div>
              <select className="select select-bordered w-full max-w-xs" value={status} onChange={(e) => setStatus(e.target.value)}
                      onClick={handleFilter}>
                  <option value="">Selecione um status</option>
                  <option value="todo">A fazer</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="done">Concluído</option>
              </select>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Data</span>
              </div>
              <select className="select select-bordered w-full max-w-xs" value={date} onChange={(e) => setDate(e.target.value)}
                      onClick={handleFilter}>
                  <option value="">Selecione a data</option>
                  <option value="due_date">Data de entrega</option>
                  <option value="completed_at">Data de conclusão</option>
              </select>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Data inicial</span>
              </div>
              <input type="date" placeholder="Digite aqui"
                     value={startDate} onChange={(e) => setStartDate(e.target.value)}
                     onBlur={handleFilter}
                     className="input input-bordered w-full max-w-xs"/>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                  <span className="label-text">Data final</span>
              </div>
              <input type="date" placeholder="Digite aqui"
                     value={endDate} onChange={(e) => setEndDate(e.target.value)}
                     onBlur={handleFilter}
                     className="input input-bordered w-full max-w-xs"/>
          </label>
          <button onClick={clearFilter} className="btn btn-primary mt-9">Limpar Filtros</button>
      </div>
  )
};
