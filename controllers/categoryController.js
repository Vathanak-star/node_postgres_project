const db = require('../models');
const MainCategory = db.MainCategory;
const SubCategory = db.SubCategory;

exports.addMainCategory = async (req,res) => {
    const {name} = req.body;
    try{
        const mainCategory = await MainCategory.create({
            name
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Main Category added successfully',
            data: mainCategory
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server error',
            errors: error.message
        })
    }
}

exports.addSubCategory = async (req,res) => {
    const {name,mainCategoryId} = req.body

    try {
        const subCategory = await SubCategory.create({
            name,
            mainCategoryId
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Sub Category added successfully',
            data: subCategory
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.updateMainCategory = async (req,res) => {
    const {id} = req.params;
    try {
        const findMainCat = await MainCategory.findByPk(id);
        if(!findMainCat){
            return res.status(404).json({
                status: 'error',
                msg: 'main category not found!'
            })
        }

        const {name} = req.body;
        const value = {
            name: name
        }

        const condition = {
            where: {
                id: id
            }
        }

        const options = {
            multi: true
        }

        const mainCatUpdated = await MainCategory.update(value,condition,options)

        return res.status(201).json({
            status: 'success',
            msg: 'Main category updated successfully',
            data: mainCatUpdated[0]
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.updateSubCategory = async (req,res) => {
    const {id} = req.params;
    try {
        const findSubCat = await SubCategory.findByPk(id);
        if(!findSubCat){
            return res.status(404).json({
                status: 'error',
                msg: 'sub category not found!'
            })
        }

        const {name,mainCategoryId} = req.body;
        const value = {
            name: name,
            mainCategoryId: mainCategoryId
        }

        const condition = {
            where: {
                id: id
            }
        }

        const options = {
            multi: true
        }

        const subCatUpdated = await SubCategory.update(value,condition,options)

        return res.status(201).json({
            status: 'success',
            msg: 'Sub category updated successfully',
            data: subCatUpdated[0]
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.deleteMainCategory = async (req,res) => {
    const {id} = req.params;

    try {
        const findMainCat = await MainCategory.findByPk(id)
        if(!findMainCat){
            return res.status(404).json({
                status: 'error',
                msg: 'Main Category not found!'
            })
        }

        const deletedMainCat = await MainCategory.destroy({
            where: {id: id}
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Deleted Main Category success',
            result: deletedMainCat,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.deleteSubCategory = async (req,res) => {
    const {id} = req.params;
    try {
        const findSubCat = await SubCategory.findByPk(id)
        if(!findSubCat){
            return res.status(404).json({
                status: 'error',
                msg: 'Sub Category not found!'
            })
        }

        const deleteSubCat = await SubCategory.destroy({
            where: {id: id}
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Deleted Sub Category success',
            result: deleteSubCat,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.mainCategory = async (req,res) => {
    try {
        const result = await MainCategory.findAll({
            include: [{
                model: SubCategory,
                as: 'subCategories'
            }],
        })

        return res.status(201).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.subCategory = async (req,res) => {
    try{
        const result = await SubCategory.findAll({})
        return res.status(201).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}