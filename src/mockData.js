import dayjs from "dayjs";

export const registryData = Array.from({ length: 200 }).map((_, i) => ({
  key: i,
  id: `SF-${10000 + i}`,
  date: "2026-05-10",
  counterparty:
    i % 3 === 0
      ? 'ООО "Ромашка"'
      : i % 3 === 1
      ? 'ООО "Василек"'
      : 'АО "Тюльпан"',
  amount: 50000 + i * 1000,
  status: i % 3 === 0 ? "OK" : i % 3 === 1 ? "ERROR" : "PENDING",
  project: i % 2 === 0 ? "Проект Альфа" : "Проект Бета",
  invoiceDate: dayjs("2026-05-10"),
  comment: `Комментарий к счету-фактуре №${i + 1}`,
}));

export const projectsData = Array.from({ length: 30 }).map((_, i) => ({
  key: i,
  projectId: `PR-SF-${1000 + i}`,
  period: "2026-05",
  records: 100 + i * 50,
  status:
    i % 3 === 0 ? "В обработке" : i % 3 === 1 ? "Ошибка" : "Готов",
  manager: i % 2 === 0 ? "Иванов И. И." : "Петров П. П.",
  comment: `Комментарий к проекту №${i + 1}`,
}));
