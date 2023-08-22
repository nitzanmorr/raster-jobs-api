const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('records', {
    identifier: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    typename: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    schema: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mdsource: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    xml: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anytext: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    wkt_geometry: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    wkb_geometry: {
      type: DataTypes.GEOMETRY('GEOMETRY', 4326),
      allowNull: true
    },
    anytext_tsvector: {
      type: "TSVECTOR",
      allowNull: true
    },
    product_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "unique_record_values"
    },
    product_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_version: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "unique_record_values"
    },
    product_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "unique_record_values"
    },
    product_sub_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    producer_name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "IDFMU"
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ingestion_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    source_start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    source_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    max_resolution_deg: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    min_horizontal_accuracy_ce_90: {
      type: DataTypes.REAL,
      allowNull: true
    },
    sensors: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    srs: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "4326"
    },
    srs_name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "WGS84GEO"
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    classification: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    links: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footprint_geojson: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rms: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    scale: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    layer_polygon_parts: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    included_in_bests: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discretes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    max_resolution_meter: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    raw_product_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    product_bbox: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    display_path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    transparency: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tile_output_format: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'records',
    schema: 'RasterCatalogManager',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "fts_gin_idx",
        fields: [
          { name: "anytext_tsvector" },
        ]
      },
      {
        name: "ix_classification",
        fields: [
          { name: "classification" },
        ]
      },
      {
        name: "ix_creation_date",
        fields: [
          { name: "creation_date" },
        ]
      },
      {
        name: "ix_max_resolution_meter",
        fields: [
          { name: "max_resolution_meter" },
        ]
      },
      {
        name: "ix_max_srs_id",
        fields: [
          { name: "srs" },
        ]
      },
      {
        name: "ix_product_id",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "ix_product_name",
        fields: [
          { name: "product_name" },
        ]
      },
      {
        name: "ix_product_sub_type",
        fields: [
          { name: "product_sub_type" },
        ]
      },
      {
        name: "ix_product_type",
        fields: [
          { name: "product_type" },
        ]
      },
      {
        name: "ix_product_version",
        fields: [
          { name: "product_version" },
        ]
      },
      {
        name: "ix_source_end_date",
        fields: [
          { name: "source_end_date" },
        ]
      },
      {
        name: "ix_source_start_date",
        fields: [
          { name: "source_start_date" },
        ]
      },
      {
        name: "ix_update_date",
        fields: [
          { name: "update_date" },
        ]
      },
      {
        name: "records_pkey",
        unique: true,
        fields: [
          { name: "identifier" },
        ]
      },
      {
        name: "records_wkb_geometry_idx",
        fields: [
          { name: "wkb_geometry" },
        ]
      },
      {
        name: "unique_record_values",
        unique: true,
        fields: [
          { name: "product_id" },
          { name: "product_version" },
          { name: "product_type" },
        ]
      },
    ]
  });
};
