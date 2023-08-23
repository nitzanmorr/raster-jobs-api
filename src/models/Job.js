const { sequelize } = require("../configs/db");
const { Sequelize, DataTypes } = require("sequelize");

const Job = sequelize.define(
  "Job",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resourceId: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resolution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      defaultValue: "",
    },
    parameters: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    creationTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn("now"),
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn("now"),
    },
    status: {
      type: DataTypes.ENUM(
        "inProgress",
        "triggered",
        "failed",
        "Pending",
        "In-Progress",
        "Completed",
        "Failed",
        "Expired",
        "Aborted"
      ),
      allowNull: false,
      defaultValue: "Pending",
    },
    percentage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    isCleaned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    internalId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    producerName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productType: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    taskCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    completedTasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    failedTasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    expiredTasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pendingTasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    inProgressTasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    abortedTasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    additionalIdentifiers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    domain: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    tableName: "Job",
    schema: "JobManager",
    timestamps: false,
    indexes: [
      {
        name: "PK_job_id",
        unique: true,
        fields: [{ name: "id" }],
      },
      {
        name: "UQ_uniqueness_on_active_tasks",
        fields: [
          { name: "resourceId" },
          { name: "version" },
          { name: "type" },
          { name: "additionalIdentifiers" },
        ],
      },
      {
        name: "additionalIdentifiersIndex",
        fields: [{ name: "additionalIdentifiers" }],
      },
      {
        name: "jobCleanedIndex",
        fields: [{ name: "isCleaned" }],
      },
      {
        name: "jobExpirationDateIndex",
        fields: [{ name: "expirationDate", order: "DESC" }],
      },
      {
        name: "jobPriorityIndex",
        fields: [{ name: "priority", order: "DESC" }],
      },
      {
        name: "jobResourceIndex",
        fields: [{ name: "resourceId" }, { name: "version" }],
      },
      {
        name: "jobStatusIndex",
        fields: [{ name: "status" }],
      },
      {
        name: "jobTypeIndex",
        fields: [{ name: "type" }],
      },
    ],
  }
);

module.exports = Job;
