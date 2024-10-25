export const initialNewDayResult = (goals: any[]) => ({
    title: "",
    description: "",
    goals,
});

export const dayResultsReducer = (state: any, action: any) => {
    switch (action.type) {
        case "changedTitle":
            return {...state, title: action.title};
        case "changedDescription":
            return {...state, description: action.description};
        case "changedCompletedGoal": {
            const updatedGoals = state.goals.map((goal: any) =>
                goal.id === action.goalId ? {...goal, completed: action.state} : goal
            );
            return {...state, goals: updatedGoals};
        }
        case "clearData":
            return initialNewDayResult(state.goals);
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};


