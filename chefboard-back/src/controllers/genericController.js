exports.createItem = (Model) => async (req, res) => {
    try {
        const item = new Model(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItems = (Model) => async (req, res) => {
    try {
        const items = await Model.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateItem = (Model) => async (req, res) => {
    try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = (Model) => async (req, res) => {
    try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.status(200).json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  