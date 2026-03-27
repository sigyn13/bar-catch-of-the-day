function lines(...parts) {
  return parts.filter(Boolean).join('\n')
}

function list(items) {
  return (items ?? []).map(i => `- ${i}`).join('\n')
}

function steps(items) {
  return (items ?? []).map((s, i) => `${i + 1}. ${s}`).join('\n')
}

export function formatDrinkForTelegram(item) {
  const title = `${item.name}`
  const desc = item.shortDescription ? `(${item.shortDescription})` : ''
  const about = item.ingredients ? `Состав: ${item.ingredients}` : ''

  const recipeIngredients = list(item.recipe?.ingredients)
  const recipeSteps = steps(item.recipe?.steps)

  const snack = item.recipe?.snackFull ? `🍴 Закуска: ${item.recipe.snackFull}` : ''

  return lines(
    title,
    desc,
    about,
    '',
    recipeIngredients ? `Ингредиенты:\n${recipeIngredients}` : '',
    '',
    recipeSteps ? `Рецепт:\n${recipeSteps}` : '',
    '',
    snack,
  ).trim()
}

export function formatPantryForTelegram(item) {
  const title = `${item.name}`
  const desc = item.shortDescription ? `(${item.shortDescription})` : ''
  const about = item.ingredients ? `Состав: ${item.ingredients}` : ''

  const recipeIngredients = list(item.recipe?.ingredients)
  const recipeSteps = steps(item.recipe?.steps)
  const notes = item.recipe?.notes ? `Заметки: ${item.recipe.notes}` : ''

  return lines(
    title,
    desc,
    about,
    '',
    recipeIngredients ? `Ингредиенты:\n${recipeIngredients}` : '',
    '',
    recipeSteps ? `Рецепт:\n${recipeSteps}` : '',
    '',
    notes,
  ).trim()
}

