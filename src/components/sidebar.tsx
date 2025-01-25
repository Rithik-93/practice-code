import { useState } from "react";

export function Component() {
    type ActiveType = 1 | 2 | 3;

    const [active, setActive] = useState<ActiveType>(1);
    const [values, setValues] = useState<Record<string, string>>({
        "1-1": "",
        "1-2": "",
        "2-1": "",
        "2-2": "",
        "3-1": "",
        "3-2": "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        group: ActiveType,
        key: string
    ) => {
        if (active === group) {
            setValues((prev) => ({
                ...prev,
                [key]: e.target.value, // Update the specific input value
            }));
        } else {
            setActive(group); // Change active group
            setValues((prev) => {
                // Clear all inputs for other groups
                const updatedValues = { ...prev };
                Object.keys(updatedValues).forEach((k) => {
                    if (k.startsWith(`${group}-`)) {
                        updatedValues[k] = ""; // Clear new group's inputs
                    }
                });
                return updatedValues;
            });
        }
    };

    return (
        <div>
            {/* Group 1 */}
            <input
                type="text"
                value={values["1-1"]}
                onChange={(e) => handleInputChange(e, 1, "1-1")}
                placeholder="input1"
            />
            <input
                type="text"
                value={values["1-2"]}
                onChange={(e) => handleInputChange(e, 1, "1-2")}
                placeholder="input2"
            />

            {/* Group 2 */}
            <input
                type="text"
                value={values["2-1"]}
                onChange={(e) => handleInputChange(e, 2, "2-1")}
                placeholder="input3"
            />
            <input
                type="text"
                value={values["2-2"]}
                onChange={(e) => handleInputChange(e, 2, "2-2")}
                placeholder="input4"
            />

            {/* Group 3 */}
            <input
                type="text"
                value={values["3-1"]}
                onChange={(e) => handleInputChange(e, 3, "3-1")}
                placeholder="input5"
            />
            <input
                type="text"
                value={values["3-2"]}
                onChange={(e) => handleInputChange(e, 3, "3-2")}
                placeholder="input6"
            />
        </div>
    );
}
